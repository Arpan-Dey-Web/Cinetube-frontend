"use client";
import React from "react";
// import { Play, Plus, Star, Calendar, Clock, User, Film } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ReviewSection } from "@/components/modules/MoviePage/ReviewSection";
import { MovieHero } from "@/components/modules/MoviePage/MovieHero";
import { VideoPlayer } from "@/components/modules/MoviePage/VideoPlayer";
import { MovieSidebar } from "@/components/modules/MoviePage/MovieSidebar";

// MOCK DATA (This is what your Backend will eventually send)
const MOCK_MOVIE = {
  id: "1",
  title: "Inception",
  description:
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  director: "Christopher Nolan",
  cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  year: "2010",
  duration: "2h 28m",
  rating: 8.8,
  genres: ["Sci-Fi", "Action", "Adventure"],
  backdrop:
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070",
  poster:
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  trailerUrl: "https://www.youtube.com/embed/8hP9D6kZseM",
};

export default function MovieDetails() {
  return (
    <main className="container mx-autoe">
      {/* Section 1: Hero & Metadata (Already built) */}
      <MovieHero data={MOCK_MOVIE} />

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-16">
          {/* Section 2: Video Player (Already built) */}
          <VideoPlayer url={MOCK_MOVIE.trailerUrl} />

          {/* Section 3: Review & Rating (The one I just gave you) */}
          <ReviewSection />
        </div>

        {/* Sidebar */}
        <aside>
          <MovieSidebar cast={MOCK_MOVIE.cast} />
        </aside>
      </div>
    </main>
  );
}
