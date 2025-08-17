"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UsernameInputProps {
  onUsernameSubmit: (username: string) => void;
  isLoading?: boolean;
}

export default function UsernameInput({ onUsernameSubmit, isLoading = false }: UsernameInputProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onUsernameSubmit(username.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-lg font-medium">
            Enter Username
          </Label>
          <p className="text-sm text-muted-foreground">
            Type a username to view their SpeedDial links
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., reiniel"
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!username.trim() || isLoading}>
            {isLoading ? "Loading..." : "Go"}
          </Button>
        </div>
      </form>
    </div>
  );
}
