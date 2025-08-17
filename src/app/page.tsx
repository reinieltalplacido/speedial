"use client";

import UsernameInput from '@/components/UsernameInput';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">SpeedDial</h1>
          <p className="text-muted-foreground">
            Share and discover your favorite links
          </p>
        </div>
        
        <UsernameInput 
          onUsernameSubmit={(username) => {
            // This will be handled by the component itself
            window.location.href = `/profile/${username}`;
          }}
        />
        
        <div className="text-xs text-muted-foreground">
          <p>Enter any username to view their shared links</p>
          <p>You can add, edit, or delete links for any username</p>
        </div>
      </div>
    </main>
  );
}
