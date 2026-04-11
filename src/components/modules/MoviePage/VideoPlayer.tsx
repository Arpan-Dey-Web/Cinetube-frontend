"use client";
import React, { useState } from "react";
import { Maximize, Minimize, PlayCircle, Film } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  streamingUrl?: string | null;
  hasAccess: boolean;
}

export const VideoPlayer = ({ streamingUrl }: VideoPlayerProps) => {
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  // If there is no URL, show the skeleton/placeholder immediately
  if (!streamingUrl) {
    return (
      <AspectRatio ratio={16 / 9}>
        <div className="w-full h-full bg-black flex items-center justify-center rounded-2xl border border-white/10 animate-pulse">
          <PlayCircle className="h-12 w-12 text-muted-foreground opacity-20" />
        </div>
      </AspectRatio>
    );
  }

  return (
    <div
      className={`space-y-4 transition-all duration-500 ${
        isTheaterMode
          ? "fixed inset-0 z-[100] bg-black p-4 md:p-12 overflow-y-auto"
          : "relative"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
          <h3 className="text-xl font-bold uppercase tracking-tighter italic text-foreground flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            Cinema Experience
          </h3>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsTheaterMode(!isTheaterMode)}
          className="bg-background/50 backdrop-blur-sm border-white/10 text-white hover:bg-white/10"
        >
          {isTheaterMode ? (
            <Minimize className="h-4 w-4 mr-2" />
          ) : (
            <Maximize className="h-4 w-4 mr-2" />
          )}
          {isTheaterMode ? "Exit Theater" : "Theater Mode"}
        </Button>
      </div>

      <div className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black ring-1 ring-white/5">
        <AspectRatio ratio={isTheaterMode ? 21 / 9 : 16 / 9}>
          <iframe
            key={streamingUrl} // Important: forces iframe to reload if URL changes
            width="100%"
            height="100%"
            src={streamingUrl}
            title="Movie Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full transition-opacity duration-700"
          ></iframe>
        </AspectRatio>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
        <div className="h-1 w-1 rounded-full bg-green-500" />
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase font-medium tracking-widest">
          High-quality stream verified. Enjoy the movie.
        </p>
      </div>
    </div>
  );
};
