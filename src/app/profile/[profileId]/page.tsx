import SpeedDialAppSimple from '@/components/SpeedDialAppSimple';

export default function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  return (
    <main className="min-h-screen bg-background">
      <SpeedDialAppSimple username={params.profileId} />
    </main>
  );
}
