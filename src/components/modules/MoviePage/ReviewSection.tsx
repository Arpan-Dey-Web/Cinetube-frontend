"use client";
import React, { useState } from "react";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  ShieldAlert,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const ReviewSection = ({
  movieId,
  initialReviews,
}: {
  movieId: string;
  initialReviews: [];
}) => {
  const [rating, setRating] = useState([8]);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <section className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <MessageSquare className="h-24 w-24" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-1.5 bg-primary rounded-full" />
          <h3 className="text-2xl font-black uppercase tracking-tighter">
            Community Reviews
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="text-center p-6 bg-background rounded-2xl border border-border">
              <span className="text-sm font-bold text-muted-foreground uppercase">
                Your Rating
              </span>
              <div className="text-5xl font-black text-primary my-2 italic">
                {rating}
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(rating[0] / 2) ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
            </div>
            <Slider
              value={rating}
              onValueChange={setRating}
              max={10}
              step={1}
              className="py-2"
            />
          </div>

          <div className="md:col-span-3 space-y-4">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your cinematic analysis..."
              className="min-h-[140px] bg-background border-border focus-visible:ring-primary rounded-2xl resize-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3 bg-background px-4 py-2 rounded-full border border-border">
                <Switch
                  id="spoiler-mode"
                  checked={isSpoiler}
                  onCheckedChange={setIsSpoiler}
                />
                <label
                  htmlFor="spoiler-mode"
                  className="text-xs font-bold uppercase cursor-pointer flex items-center gap-2"
                >
                  <ShieldAlert
                    className={`h-4 w-4 ${isSpoiler ? "text-red-500" : "text-muted-foreground"}`}
                  />
                  Contains Spoilers
                </label>
              </div>

              <Button
                disabled={!comment}
                className="bg-primary hover:scale-105 transition-transform text-primary-foreground px-8 rounded-xl font-bold uppercase italic shadow-lg shadow-primary/20"
              >
                <Send className="h-4 w-4 mr-2" /> Post Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold uppercase italic">
              Recent Critiques
            </h3>
          </div>
          <Badge variant="secondary" className="rounded-full px-4 italic">
            Verified Viewers
          </Badge>
        </div>

        {/* <div className="grid gap-6">
          {initialReviews.length > 0 ? (
            initialReviews.map((rev) => (
              <div
                key={rev.id}
                className="group bg-card/40 backdrop-blur-sm border border-border p-6 rounded-2xl hover:bg-card/80 transition-all duration-300 shadow-sm"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20 p-0.5">
                      <AvatarImage src={rev.user.image} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {rev.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-black text-foreground text-lg tracking-tight leading-none mb-1">
                        {rev.user.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge className="text-[10px] h-4 bg-muted text-muted-foreground">
                          {rev.user.role}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-lg font-black text-primary italic">
                      {rev.rating}
                    </span>
                  </div>
                </div>

                <div className="pl-16">
                  {rev.isSpoiler ? (
                    <div className="relative group/spoiler cursor-help bg-muted/30 p-4 rounded-xl border border-dashed border-border">
                      <p className="text-muted-foreground blur-md select-none transition-all duration-700 group-hover/spoiler:blur-none">
                        {rev.comment}
                      </p>
                      <div className="absolute inset-0 flex items-center justify-center group-hover/spoiler:opacity-0 transition-opacity">
                        <Badge
                          variant="destructive"
                          className="uppercase italic tracking-tighter"
                        >
                          ⚠️ Spoiler: Hover to See
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed text-lg italic">
                      {rev.comment}
                    </p>
                  )}

                  <div className="flex items-center gap-8 mt-6">
                    <button className="flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest group">
                      <ThumbsUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />{" "}
                      {rev.likes} Appreciation
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                      <MessageSquare className="h-4 w-4" /> Discuss
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-border">
              <MessageSquare className="h-12 w-12 text-muted mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">
                No reviews yet. Be the first to rate this title!
              </p>
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
};
