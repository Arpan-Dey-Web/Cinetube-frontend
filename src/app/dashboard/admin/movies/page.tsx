import { Badge } from "@/components/ui/badge";
import { MOCK_ADMIN_MOVIES } from "@/lib/mock-data";

export default function AdminMoviesPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Admin Library
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
          Manage Movies
        </h1>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card/20">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-border px-6 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
          <span>Title</span>
          <span>Genre</span>
          <span>Status</span>
          <span>Rating</span>
          <span>Published</span>
        </div>
        {MOCK_ADMIN_MOVIES.map((movie) => (
          <div
            key={movie.id}
            className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-border/60 px-6 py-4 text-sm last:border-b-0"
          >
            <div>
              <p className="font-black uppercase tracking-tight text-foreground">
                {movie.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {movie.director} • {movie.year}
              </p>
            </div>
            <span className="text-muted-foreground">{movie.genre}</span>
            <Badge variant={movie.status === "PREMIUM" ? "default" : "secondary"}>
              {movie.status}
            </Badge>
            <span className="text-muted-foreground">{movie.rating}</span>
            <Badge variant={movie.isPublished ? "default" : "secondary"}>
              {movie.isPublished ? "Live" : "Draft"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
