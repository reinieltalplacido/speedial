"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import LinkGrid from "@/components/LinkGrid";
import LinkForm from "@/components/LinkForm";

export interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
}

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<Link | null>(null);

  // Load links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem("speedDialLinks");
    if (savedLinks) {
      try {
        setLinks(JSON.parse(savedLinks));
      } catch (error) {
        console.error("Failed to parse saved links:", error);
      }
    }
  }, []);

  // Save links to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("speedDialLinks", JSON.stringify(links));
  }, [links]);

  const handleAddLink = (link: Omit<Link, "id">) => {
    const newLink = {
      ...link,
      id: Date.now().toString(),
    };
    setLinks([...links, newLink]);
    setIsAddModalOpen(false);
  };

  const handleEditLink = (updatedLink: Link) => {
    setLinks(
      links.map((link) => (link.id === updatedLink.id ? updatedLink : link)),
    );
    setIsEditModalOpen(false);
    setCurrentLink(null);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const openEditModal = (link: Link) => {
    setCurrentLink(link);
    setIsEditModalOpen(true);
  };

  return (
    <main className="min-h-screen p-6 md:p-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Speed Dial</h1>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Link
          </Button>
        </header>

        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-muted p-6 rounded-lg max-w-md">
              <h2 className="text-xl font-medium mb-2">No links yet</h2>
              <p className="text-muted-foreground mb-6">
                Add your first link to get started with your personal speed dial
                dashboard.
              </p>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 flex-row-reverse justify-start"
              >
                <Plus size={16} />
                Add Your First Link
              </Button>
            </div>
          </div>
        ) : (
          <LinkGrid
            links={links}
            onEdit={openEditModal}
            onDelete={handleDeleteLink}
          />
        )}

        {/* Add Link Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Link</DialogTitle>
            </DialogHeader>
            <LinkForm
              onSubmit={handleAddLink}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Link Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
            </DialogHeader>
            <LinkForm
              initialValues={currentLink || undefined}
              onSubmit={(data) => {
                if ("id" in data) {
                  handleEditLink(data);
                }
              }}
              onCancel={() => setIsEditModalOpen(false)}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
