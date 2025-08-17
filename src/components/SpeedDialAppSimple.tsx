"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import LinkGrid from "@/components/LinkGrid";
import LinkForm from "@/components/LinkForm";
import { linksApi, ApiError } from "@/lib/api";
import { Link } from "@/lib/types";

interface SpeedDialAppSimpleProps {
  username: string;
}

export default function SpeedDialAppSimple({ username }: SpeedDialAppSimpleProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<Link | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load links from API on component mount
  useEffect(() => {
    if (username) {
      loadLinks(username);
    }
  }, [username]);

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setError(message);
      setTimeout(() => setError(null), 5000);
    } else {
      setSuccess(message);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const loadLinks = async (uname: string) => {
    try {
      setIsLoading(true);
      const fetchedLinks = await linksApi.getLinks(uname);
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Failed to load links:", error);
      showMessage(
        error instanceof ApiError 
          ? error.message 
          : "Failed to load links. Please try again.",
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLink = async (linkData: { title: string; url: string; category: string; username: string }) => {
    try {
      setIsSaving(true);
      const newLink = await linksApi.createLink({
        ...linkData,
        createdAt: new Date().toISOString(),
      });
      setLinks([...links, newLink]);
      setIsAddModalOpen(false);
      showMessage("Link added successfully!");
    } catch (error) {
      console.error("Failed to add link:", error);
      showMessage(
        error instanceof ApiError 
          ? error.message 
          : "Failed to add link. Please try again.",
        true
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditLink = async (updatedLink: { id: string; title: string; url: string; category: string; username: string }) => {
    try {
      setIsSaving(true);
      const editedLink = await linksApi.updateLink({ 
        ...updatedLink, 
        username,
        createdAt: currentLink?.createdAt || new Date().toISOString(),
      });
      setLinks(
        links.map((link) => (link.id === editedLink.id ? editedLink : link)),
      );
      setIsEditModalOpen(false);
      setCurrentLink(null);
      showMessage("Link updated successfully!");
    } catch (error) {
      console.error("Failed to update link:", error);
      showMessage(
        error instanceof ApiError 
          ? error.message 
          : "Failed to update link. Please try again.",
        true
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await linksApi.deleteLink(id, username);
      setLinks(links.filter((link) => link.id !== id));
      showMessage("Link deleted successfully!");
    } catch (error) {
      console.error("Failed to delete link:", error);
      showMessage(
        error instanceof ApiError 
          ? error.message 
          : "Failed to delete link. Please try again.",
        true
      );
    }
  };

  const openEditModal = (link: Link) => {
    setCurrentLink(link);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <main className="min-h-screen p-3 sm:p-6 md:p-12 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Message Display */}
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <header className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Speed Dial</h1>
              <p className="text-muted-foreground">@{username}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 w-full sm:w-auto">
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                  disabled={isSaving}
                >
                  <Plus size={16} />
                  <span className="hidden xs:inline">Add Link</span>
                  <span className="inline xs:hidden">Add</span>
                </Button>
              </div>
            </div>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="bg-muted p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-md w-full">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <h2 className="text-lg sm:text-xl font-medium mb-2">Loading your links...</h2>
                <p className="text-muted-foreground text-sm">
                  Please wait while we fetch your speed dial links.
                </p>
              </div>
            </div>
          ) : links.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="bg-muted p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-md w-full">
                <h2 className="text-lg sm:text-xl font-medium mb-2">No links yet</h2>
                <p className="text-muted-foreground mb-6 text-sm">
                  Add your first link to get started with your personal speed dial dashboard.
                </p>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 flex-row-reverse justify-start w-full sm:w-auto"
                  disabled={isSaving}
                >
                  <Plus size={16} />
                  <span className="hidden xs:inline">Add Your First Link</span>
                  <span className="inline xs:hidden">Add Link</span>
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
                isLoading={isSaving}
                username={username}
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
                isLoading={isSaving}
                username={username}
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </>
  );
}
