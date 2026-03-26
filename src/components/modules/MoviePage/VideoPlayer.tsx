import { AspectRatio } from "@/components/ui/aspect-ratio";

export const VideoPlayer = ({ url }: { url: string }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="h-8 w-1.5 bg-primary rounded-full" />
      <h3 className="text-2xl font-black uppercase tracking-tighter italic">
        Official Trailer
      </h3>
    </div>
    <div className="group relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={url}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
    </div>
  </div>
);
