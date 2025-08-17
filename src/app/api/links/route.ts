import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'links.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(dataFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read links from file
async function readLinks() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Write links to file
async function writeLinks(links: any[]) {
  await ensureDataDirectory();
  await fs.writeFile(dataFilePath, JSON.stringify(links, null, 2));
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
    await writeLinks(links);

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create link' },
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
