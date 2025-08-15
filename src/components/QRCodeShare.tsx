"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode, Share2 } from "lucide-react";
import QRCode from "qrcode";

export default function QRCodeShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    try {
      setIsGenerating(true);
      const profileId = typeof window !== 'undefined' ? localStorage.getItem('profileId') : '';
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const shareUrl = profileId ? `${baseUrl}/profile/${profileId}` : baseUrl;
      const qrCodeDataUrl = await QRCode.toDataURL(shareUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      setQrCodeDataUrl(qrCodeDataUrl);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    generateQRCode();
  };

  const handleShare = async () => {
    const profileId = typeof window !== 'undefined' ? localStorage.getItem('profileId') : '';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = profileId ? `${baseUrl}/profile/${profileId}` : baseUrl;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SpeedDial - My Links",
          text: "Check out my SpeedDial links!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("URL copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy URL:", error);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <QrCode size={16} />
        Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share SpeedDial</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4">
            {isGenerating ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-64 h-64 bg-muted animate-pulse rounded-lg"></div>
                <p className="text-sm text-muted-foreground">Generating QR code...</p>
              </div>
            ) : (
              <>
                <div className="bg-white p-4 rounded-lg">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code for SpeedDial"
                    className="w-64 h-64"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your phone to access your SpeedDial
                  </p>
                  <p className="text-xs text-muted-foreground break-all">
                    {typeof window !== 'undefined' && localStorage.getItem('profileId')
                      ? `${window.location.origin}/profile/${localStorage.getItem('profileId')}`
                      : ''}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 size={16} />
                    Share URL
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.download = "speeddial-qr.png";
                      link.href = qrCodeDataUrl;
                      link.click();
                    }}
                  >
                    Download QR
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
