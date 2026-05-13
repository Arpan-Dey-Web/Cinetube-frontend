import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type EditableMovieSummary = {
  title: string;
  director: string;
  year: string;
  status: "FREE" | "PREMIUM";
  posterUrl?: string | null;
};

export default function EditMovieDetails({
  movie,
}: {
  movie: EditableMovieSummary;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-background/60 p-4">
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 space-y-2">
        <Badge variant={movie.status === "PREMIUM" ? "default" : "secondary"}>
          {movie.status}
        </Badge>
        <div>
          <h3 className="line-clamp-2 text-lg font-black uppercase tracking-tight">
            {movie.title}
          </h3>
          <p className="text-xs font-medium text-muted-foreground">
            {movie.director} • {movie.year}
          </p>
        </div>
      </div>
    </div>
  );
}
