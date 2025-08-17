"use client";

import React from "react";
import LinkCard from "@/components/LinkCard";
import { Link } from "@/lib/types";

interface LinkGridProps {
  links?: Link[];
  onEdit?: (link: Link) => void;
  onDelete?: (id: string) => void;
}

const LinkGrid = ({
  links = [],
  onEdit = () => {},
  onDelete = () => {},
}: LinkGridProps) => {
  // Default links for demonstration when no links are provided
  const defaultLinks: Link[] = [
    {
      id: "1",
      title: "Google",
      url: "https://google.com",
      category: "Search",
      username: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "GitHub",
      url: "https://github.com",
      category: "Development",
      username: "demo",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "YouTube",
      url: "https://youtube.com",
      category: "Entertainment",
      username: "demo",
      createdAt: new Date().toISOString(),
    },
  ];

  const displayLinks = links.length > 0 ? links : defaultLinks;

  return (
    <div className="bg-background w-full p-2 sm:p-4">
      {displayLinks.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
          {displayLinks.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              title={link.title}
              url={link.url}
              category={link.category}
              onEdit={() => onEdit(link)}
              onDelete={() => onDelete(link.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-xl text-muted-foreground mb-4">
            No links added yet
          </p>
          <p className="text-muted-foreground">
            Click the "Add Link" button to create your first speed dial link
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkGrid;
