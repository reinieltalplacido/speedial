import LinkGrid from '@/components/LinkGrid';
import { Link } from '@/app/page';

interface ProfilePageProps {
  params: { profileId: string };
}

async function fetchLinks(profileId: string): Promise<Link[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/links?profileId=${profileId}`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const links = await fetchLinks(params.profileId);
  return (
    <main className="min-h-screen p-3 sm:p-6 md:p-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">Shared Links</h1>
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-md w-full">
              <h2 className="text-lg sm:text-xl font-medium mb-2">No links found</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                This profile has no shared links yet.
              </p>
            </div>
          </div>
        ) : (
          <LinkGrid links={links} />
        )}
      </div>
    </main>
  );
}
