"use client";

import dynamic from "next/dynamic";

export interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
}

const SpeedDialApp = dynamic(() => import("@/components/SpeedDialAppSimple"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen p-6 md:p-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-muted p-6 rounded-lg max-w-md">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto mb-4"></div>
            <h2 className="text-xl font-medium mb-2">Loading SpeedDial...</h2>
            <p className="text-muted-foreground">
              Please wait while we load your personal link dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function Home() {
  return <SpeedDialApp />;
}
