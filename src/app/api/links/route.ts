import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'links.json');

// In-memory storage fallback for Vercel
let inMemoryLinks: any[] = [
  {
    "id": "1755265449713",
    "title": "Instagram",
    "url": "https://www.instagram.com",
    "category": "INSTA",
    "username": "demo",
    "createdAt": "2025-08-15T13:44:09.713Z"
  },
  {
    "id": "1755325622564",
    "title": "Facebook",
    "url": "https://www.facebook.com",
    "category": "General",
    "username": "oreo",
    "createdAt": "2025-08-16T06:27:02.564Z"
  },
  {
    "id": "1755326335371",
    "title": "Tempo",
    "url": "https://www.tempo.new",
    "category": "General",
    "username": "oreo",
    "createdAt": "2025-08-16T06:38:55.371Z"
  }
];
let useInMemory = false;

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(dataFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (mkdirError) {
      console.warn('Failed to create data directory, using in-memory storage:', mkdirError);
      useInMemory = true;
    }
  }
}

// Read links from file or memory
async function readLinks() {
  if (useInMemory) {
    return inMemoryLinks;
  }
  
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const links = JSON.parse(data);
    // Keep in-memory copy in sync
    inMemoryLinks = links;
    return links;
  } catch (error) {
    console.warn('Failed to read from file, using in-memory storage:', error);
    useInMemory = true;
    return inMemoryLinks;
  }
}

// Write links to file or memory
async function writeLinks(links: any[]) {
  // Always update in-memory storage
  inMemoryLinks = links;
  
  if (useInMemory) {
    console.log('Using in-memory storage, links updated successfully');
    return;
  }
  
  try {
    await ensureDataDirectory();
    await fs.writeFile(dataFilePath, JSON.stringify(links, null, 2));
    console.log('Links written successfully to:', dataFilePath);
  } catch (error) {
    console.error('Error writing links to file, switching to in-memory storage:', error);
    useInMemory = true;
    // Links are already in memory, so this is fine
  }
}

// GET - Retrieve all links for a username
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const links = await readLinks();
    if (username) {
      const filtered = links.filter((link: any) => link.username === username);
      return NextResponse.json(filtered);
    }
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    );
  }
}

// POST - Create a new link for a username
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url, category, username } = body;

    if (!title || !url || !username) {
      return NextResponse.json(
        { error: 'Title, URL, and username are required' },
        { status: 400 }
      );
    }

    console.log('Creating link:', { title, url, category, username });

    const links = await readLinks();
    const newLink = {
      id: Date.now().toString(),
      title,
      url,
      category: category || 'General',
      username,
      createdAt: new Date().toISOString(),
    };

    links.push(newLink);
    
    try {
      await writeLinks(links);
      console.log('Link created successfully:', newLink.id);
    } catch (writeError) {
      console.error('Failed to write links:', writeError);
      return NextResponse.json(
        { error: 'Failed to save link to storage' },
        { status: 500 }
      );
    }

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/links:', error);
    return NextResponse.json(
      { error: 'Failed to create link', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT - Update a link (must match username)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, url, category, username } = body;

    if (!id || !title || !url || !username) {
      return NextResponse.json(
        { error: 'ID, title, URL, and username are required' },
        { status: 400 }
      );
    }

    const links = await readLinks();
    const linkIndex = links.findIndex((link: any) => link.id === id && link.username === username);

    if (linkIndex === -1) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    links[linkIndex] = {
      ...links[linkIndex],
      title,
      url,
      category: category || 'General',
      updatedAt: new Date().toISOString(),
    };

    await writeLinks(links);
    return NextResponse.json(links[linkIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update link' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a link (must match username)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const username = searchParams.get('username');

    if (!id || !username) {
      return NextResponse.json(
        { error: 'Link ID and username are required' },
        { status: 400 }
      );
    }

    const links = await readLinks();
    const filteredLinks = links.filter((link: any) => !(link.id === id && link.username === username));

    if (filteredLinks.length === links.length) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    await writeLinks(filteredLinks);
    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete link' },
      { status: 500 }
    );
  }
}
