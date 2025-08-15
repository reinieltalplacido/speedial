"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Upload, FileText } from "lucide-react";
import { Link } from "@/app/page";

interface DataBackupProps {
  links: Link[];
  onImport: (links: Link[]) => void;
}

export default function DataBackup({ links, onImport }: DataBackupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    const dataStr = JSON.stringify(links, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `speeddial-links-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedLinks = JSON.parse(content);
        
        if (Array.isArray(importedLinks)) {
          onImport(importedLinks);
          alert(`Successfully imported ${importedLinks.length} links!`);
        } else {
          alert("Invalid file format. Please select a valid SpeedDial backup file.");
        }
      } catch (error) {
        console.error("Error importing links:", error);
        alert("Error importing links. Please check the file format.");
      } finally {
        setIsImporting(false);
        setIsOpen(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <FileText size={16} />
        Backup
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Backup & Restore</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Export Links</h3>
              <p className="text-sm text-muted-foreground">
                Download your links as a JSON file to backup or transfer to another device.
              </p>
              <Button
                onClick={handleExport}
                className="w-full flex items-center gap-2"
                disabled={links.length === 0}
              >
                <Download size={16} />
                Export {links.length} Links
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Import Links</h3>
              <p className="text-sm text-muted-foreground">
                Upload a previously exported JSON file to restore your links.
              </p>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isImporting}
                />
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  disabled={isImporting}
                >
                  <Upload size={16} />
                  {isImporting ? "Importing..." : "Choose File"}
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Tip:</strong> You can use this feature to transfer your links between devices 
                or create backups. The exported file contains all your link data in JSON format.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
