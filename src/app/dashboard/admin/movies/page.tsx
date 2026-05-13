"use client";
import { Badge } from "@/components/ui/badge";
import EditMovieDetails from "@/features/dashboard/components/Dashboard/EditMovieDetails";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BASE_URL } from "@/features/movie/api/api";
import {
  Edit2,
  Trash2,
  Loader2,
  Globe,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Movie {
  id: string;
  title: string;
  description: string;
  director: string;
  cast: string[];
  year: string;
  duration: string;
  rating: number;
  genres: string[];
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  streamingUrl: string;
  platform: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isTrending: boolean;
  status: "FREE" | "PREMIUM";
}

export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie`);
      const data = await res.json();
      setMovies(data.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (movie: Movie) => {
    setSelectedMovie({ ...movie });
    setIsEditDialogOpen(true);
  };

  const handleUpdateMovie = async () => {
    if (!selectedMovie) return;
    setIsUpdating(true);
    console.log("selected Movie", selectedMovie);
    try {
      const res = await fetch(`${BASE_URL}/movie/update-movie/${selectedMovie.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(selectedMovie),
      });

      if (res.ok) {
        toast.success("Movie updated successfully");
        setIsEditDialogOpen(false);
        fetchMovies();
      }
    } catch {
      toast.error("Failed to update movie");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-20 text-muted-foreground animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="border-b border-border pb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Admin Library
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
          Manage Movies
        </h1>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card/20">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.6fr_0.5fr_0.6fr_0.8fr] gap-4 border-b border-border px-6 py-4 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
          <span>Title</span>
          <span>Genre</span>
          <span>Status</span>
          <span>Rating</span>
          <span>Published</span>
          <span className="text-right">Actions</span>
        </div>

        {movies.map((movie: Movie) => (
          <div
            key={movie.id}
            className="grid grid-cols-[1.4fr_0.8fr_0.6fr_0.5fr_0.6fr_0.8fr] gap-4 border-b border-border/60 px-6 py-4 text-sm items-center last:border-b-0 hover:bg-muted/50 transition-colors"
          >
            <div>
              <p className="font-black uppercase tracking-tight text-foreground line-clamp-1">
                {movie.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {movie.director} • {movie.year}
              </p>
            </div>
            <span className="text-muted-foreground truncate">
              {movie.genres?.[0] || "N/A"}
            </span>
            <div>
              <Badge
                variant={movie.status === "PREMIUM" ? "default" : "secondary"}
                className="text-[10px]"
              >
                {movie.status}
              </Badge>
            </div>
            <span className="font-medium text-muted-foreground">
              {movie.rating}
            </span>
            <div>
              <Badge
                variant={movie.isPublished ? "outline" : "secondary"}
                className="text-[10px]"
              >
                {movie.isPublished ? "Live" : "Draft"}
              </Badge>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditClick(movie)}
                className="text-blue-500 hover:bg-blue-500/10"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT DIALOG - Widened to 5xl */}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight text-primary">
              Edit Movie Details
            </DialogTitle>
          </DialogHeader>

          {selectedMovie && (
            <div className="space-y-6 py-6">
              <EditMovieDetails movie={selectedMovie} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-l-2 border-primary pl-3">
                    General Information
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Movie Title</Label>
                      <Input
                        value={selectedMovie.title}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            title: e.target.value,
                          })
                        }
                        className="bg-background/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Director</Label>
                        <Input
                          value={selectedMovie.director}
                          onChange={(e) =>
                            setSelectedMovie({
                              ...selectedMovie,
                              director: e.target.value,
                            })
                          }
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Release Year</Label>
                        <Input
                          type="number"
                          value={selectedMovie.year}
                          onChange={(e) =>
                            setSelectedMovie({
                              ...selectedMovie,
                              year: e.target.value,
                            })
                          }
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Genres (comma separated)</Label>
                      <Input
                        value={selectedMovie.genres?.join(", ")}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            genres: e.target.value
                              .split(", ")
                              .filter((g) => g !== ""),
                          })
                        }
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        rows={6}
                        value={selectedMovie.description}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            description: e.target.value,
                          })
                        }
                        className="bg-background/50 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Assets & Status */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-l-2 border-primary pl-3">
                    Media Assets & Links
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <ImageIcon className="w-3 h-3 text-primary" /> Poster
                        URL
                      </Label>
                      <Input
                        value={selectedMovie.posterUrl}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            posterUrl: e.target.value,
                          })
                        }
                        className="bg-background/50 font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <ImageIcon className="w-3 h-3 text-primary" /> Backdrop
                        URL
                      </Label>
                      <Input
                        value={selectedMovie.backdropUrl}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            backdropUrl: e.target.value,
                          })
                        }
                        className="bg-background/50 font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Video className="w-3 h-3 text-primary" /> Trailer URL
                      </Label>
                      <Input
                        value={selectedMovie.trailerUrl}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            trailerUrl: e.target.value,
                          })
                        }
                        className="bg-background/50 font-mono text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Globe className="w-3 h-3 text-primary" /> Streaming URL
                      </Label>
                      <Input
                        value={selectedMovie.streamingUrl}
                        onChange={(e) =>
                          setSelectedMovie({
                            ...selectedMovie,
                            streamingUrl: e.target.value,
                          })
                        }
                        className="bg-background/50 font-mono text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div className="space-y-2">
                        <Label>Access Status</Label>
                        <Select
                          value={selectedMovie.status}
                          onValueChange={(val) =>
                            setSelectedMovie({
                              ...selectedMovie,
                              status: val === "PREMIUM" ? "PREMIUM" : "FREE",
                            })
                          }
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="FREE">FREE</SelectItem>
                            <SelectItem value="PREMIUM">PREMIUM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col justify-end">
                        <div className="flex items-center justify-between p-2.5 border rounded-md bg-muted/20 border-border/50">
                          <Label className="text-xs font-bold uppercase">
                            Published
                          </Label>
                          <Switch
                            checked={selectedMovie.isPublished}
                            onCheckedChange={(checked) =>
                              setSelectedMovie({
                                ...selectedMovie,
                                isPublished: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t border-border pt-6 mt-2">
            <Button
              variant="ghost"
              onClick={() => setIsEditDialogOpen(false)}
              className="font-bold uppercase text-[10px] tracking-widest"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateMovie}
              disabled={isUpdating}
              className="min-w-[140px] font-bold uppercase text-[10px] tracking-widest"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
