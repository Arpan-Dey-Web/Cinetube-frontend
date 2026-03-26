"use client";
import React, { useState } from "react";
import { Star, ThumbsUp, MessageSquare, ShieldAlert, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock existing reviews for UI development
const MOCK_REVIEWS = [
  {
    id: 1,
    user: "Alex Rivera",
    rating: 9,
    comment:
      "An absolute masterpiece of modern sci-fi. The cinematography is breathtaking!",
    isSpoiler: false,
    likes: 24,
    date: "2 days ago",
  },
  {
    id: 2,
    user: "Sarah Connor",
    rating: 7,
    comment:
      "The plot was a bit confusing toward the end, but the acting was top-notch. Definitely worth a watch if you like mind-bending movies.",
    isSpoiler: true, // This will be hidden by default
    likes: 12,
    date: "1 week ago",
  },
];

export const ReviewSection = () => {
  const [rating, setRating] = useState([8]);
  const [showSpoiler, setShowSpoiler] = useState(false);

  return (
    <section className="space-y-12">
      {/* 1. WRITE A REVIEW FORM */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-primary rounded-full" />
          <h3 className="text-xl font-bold uppercase tracking-tight">
            Rate & Review
          </h3>
        </div>

        <div className="space-y-8">
          {/* 1-10 Slider Rating */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Your Score
              </span>
              <span className="text-3xl font-black text-primary">
                {rating}/10
              </span>
            </div>
            <Slider
              value={rating}
              onValueChange={setRating}
              max={10}
              step={1}
              className="py-4"
            />
          </div>

          {/* Text Area */}
          <div className="space-y-4">
            <Textarea
              placeholder="What did you think of the movie? Share your thoughts..."
              className="min-h-[120px] bg-background border-border focus-visible:ring-primary"
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Switch
                  id="spoiler-mode"
                  checked={showSpoiler}
                  onCheckedChange={setShowSpoiler}
                />
                <label
                  htmlFor="spoiler-mode"
                  className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
                >
                  <ShieldAlert className="h-4 w-4 text-amber-500" /> Contains
                  Spoilers?
                </label>
              </div>

              <Button className="bg-primary text-primary-foreground px-8 gap-2">
                <Send className="h-4 w-4" /> Submit Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. REVIEWS FEED */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-xl font-bold uppercase">
            User Reviews ({MOCK_REVIEWS.length})
          </h3>
          <Badge variant="outline" className="border-primary text-primary">
            Admin Approved Only
          </Badge>
        </div>

        <div className="space-y-4">
          {MOCK_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-card/50 border border-border p-6 rounded-xl hover:border-primary/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${rev.user}`}
                    />
                    <AvatarFallback>{rev.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-foreground leading-none">
                      {rev.user}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {rev.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-bold text-primary">
                    {rev.rating}
                  </span>
                </div>
              </div>

              {/* Spoiler Logic */}
              <div className="relative">
                {rev.isSpoiler ? (
                  <div className="group relative">
                    <p className="text-muted-foreground blur-md select-none transition-all duration-500 group-hover:blur-none">
                      {rev.comment}
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                      <Badge
                        variant="destructive"
                        className="flex gap-1 animate-pulse"
                      >
                        <ShieldAlert className="h-3 w-3" /> SPOILER: Hover to
                        reveal
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/50">
                <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                  <ThumbsUp className="h-4 w-4" /> {rev.likes} Likes
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                  <MessageSquare className="h-4 w-4" /> Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
