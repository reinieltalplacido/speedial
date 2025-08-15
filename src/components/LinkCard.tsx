"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface LinkCardProps {
  id: string;
  title: string;
  url: string;
  category?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const LinkCard = ({
  id = "default-id",
  title = "Example Link",
  url = "https://example.com",
  category = "General",
  onEdit = () => {},
  onDelete = () => {},
}: LinkCardProps) => {
  // Extract domain for favicon
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (e) {
      return `https://www.google.com/s2/favicons?domain=example.com&sz=32`;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Don't open the link if clicking on the edit or delete buttons
    if ((e.target as HTMLElement).closest(".card-actions")) {
      e.preventDefault();
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <Card
      className="bg-card border border-border rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden w-full max-w-[95vw] xs:max-w-[320px] sm:max-w-[280px]"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        {/* Favicon and title section */}
        <div className="bg-card p-3 sm:p-4 flex items-center justify-center">
          <img
            src={getFaviconUrl(url)}
            alt=""
            className="w-8 h-8 rounded-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://www.google.com/s2/favicons?domain=example.com&sz=32";
            }}
          />
        </div>

        {/* Title, URL and Category section */}
        <div className="bg-card p-2 sm:p-3 border-t border-border">
          <h3 className="font-medium text-sm sm:text-base text-foreground truncate mb-1">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate mb-1">
            {url.replace(/^https?:\/\//i, "")}
          </p>
          <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
            {category}
          </span>
        </div>

        {/* Action buttons */}
        <div className="card-actions flex justify-end gap-2 sm:gap-1 p-2 bg-card border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 sm:h-7 sm:w-7 p-0 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4 sm:h-3 sm:w-3" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 sm:h-7 sm:w-7 p-0 text-destructive hover:text-destructive hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4 sm:h-3 sm:w-3" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
