"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  ShieldAlert,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/auth-provider";
import {
  createReviewRequest,
  toggleReviewLikeRequest,
} from "@/features/review/api/mutations";
import type { Review } from "@/types";

function updateReviewLikesInTree(
  list: Review[],
  reviewId: string,
  likes: number,
  likedByMe: boolean,
): Review[] {
  return list.map((review) => {
    if (review.id === reviewId) {
      return { ...review, likes, likedByMe };
    }
    if (review.children?.length) {
      return {
        ...review,
        children: updateReviewLikesInTree(
          review.children,
          reviewId,
          likes,
          likedByMe,
        ),
      };
    }
    return review;
  });
}

export const ReviewSection = ({
  movieId,
  initialReviews,
}: {
  movieId: string;
  initialReviews: Review[];
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();

  const [rating, setRating] = useState([8]);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");
  const [reviews, setReviews] = useState(initialReviews);
  const [revealedSpoilers, setRevealedSpoilers] = useState<string[]>([]);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  const refreshFromServer = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const submitReview = async () => {
    if (!user) {
      setFormError("Sign in to post a review.");
      return;
    }
    if (!comment.trim()) {
      return;
    }

    setFormError(null);
    try {
      await createReviewRequest({
        movieId,
        comment: comment.trim(),
        rating: rating[0],
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .slice(0, 8),
        isSpoiler,
      });
      setComment("");
      setTags("");
      setIsSpoiler(false);
      setRating([8]);
      refreshFromServer();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not submit review.",
      );
    }
  };

  const likeReview = async (reviewId: string) => {
    if (!user) {
      return;
    }
    try {
      const result = await toggleReviewLikeRequest(reviewId);
      setReviews((current) =>
        updateReviewLikesInTree(
          current,
          reviewId,
          result.likes,
          result.liked,
        ),
      );
    } catch {
      // Like failed; leave state unchanged
    }
  };

  const submitReply = async (reviewId: string) => {
    if (!user) {
      return;
    }
    const draft = replyDrafts[reviewId]?.trim();
    if (!draft) {
      return;
    }

    try {
      await createReviewRequest({
        movieId,
        comment: draft,
        parentId: reviewId,
      });
      setReplyDrafts((current) => ({ ...current, [reviewId]: "" }));
      refreshFromServer();
    } catch {
      // Reply failed
    }
  };

  const renderReviewCard = (review: Review, depth: number) => {
    const spoilerVisible =
      !review.isSpoiler || revealedSpoilers.includes(review.id);
    const tagsList = review.tags ?? [];
    const showRating = review.rating >= 1;

    return (
      <div
        key={review.id}
        className={`group rounded-2xl border border-border bg-card/40 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-card/80 ${depth > 0 ? "ml-0 border-l-2 border-l-primary/30 md:ml-12" : ""
          }`}
      >
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/20 p-0.5">
              <AvatarImage src={review.user.image ?? undefined} />
              <AvatarFallback className="bg-primary/10 font-bold text-primary">
                {review.user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="mb-1 text-lg font-black leading-none tracking-tight text-foreground">
                {review.user.name}
              </h4>
              <div className="flex items-center gap-2">
                <Badge className="h-4 bg-muted text-[10px] text-muted-foreground">
                  {review.user.role}
                </Badge>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          {showRating && (
            <div className="flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-lg font-black italic text-primary">
                {review.rating}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-4 pl-0 md:pl-16">
          {review.isSpoiler ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
              <p
                className={`text-muted-foreground transition-all duration-500 ${spoilerVisible ? "" : "select-none blur-md"
                  }`}
              >
                {review.comment}
              </p>
              {!spoilerVisible && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setRevealedSpoilers((current) => [...current, review.id])
                  }
                  className="mt-4 rounded-full text-[10px] font-black uppercase tracking-[0.25em]"
                >
                  Reveal Spoiler
                </Button>
              )}
            </div>
          ) : (
            <p className="text-lg italic leading-relaxed text-muted-foreground">
              {review.comment}
            </p>
          )}

          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-8">
            <button
              type="button"
              disabled={!user || isPending}
              onClick={() => likeReview(review.id)}
              className={`group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${review.likedByMe
                ? "text-yellow-500" // Changed to yellow
                : "text-muted-foreground hover:text-yellow-400"
                } disabled:opacity-50`}
            >
              <motion.div
                key={review.likedByMe ? "liked" : "unliked"}
                initial={false}
                animate={review.likedByMe ? { scale: [1, 1.4, 1], rotate: [0, -15, 0] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <ThumbsUp
                  className={`h-4 w-4 ${review.likedByMe ? "fill-yellow-500" : "fill-none"
                    }`}
                />
              </motion.div>

              <motion.span
                key={review.likes}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                {review.likes} Like
              </motion.span>
            </button>
            {depth === 0 && (
              <button
                type="button"
                onClick={() =>
                  setReplyDrafts((current) => ({
                    ...current,
                    [review.id]: current[review.id] ?? "",
                  }))
                }
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageSquare className="h-4 w-4" /> Reply
              </button>
            )}
          </div>

          {depth === 0 &&
            user &&
            replyDrafts[review.id] !== undefined && (
              <div className="space-y-3 rounded-2xl border border-border/70 bg-background/70 p-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <Textarea
                    value={replyDrafts[review.id] ?? ""}
                    onChange={(event) =>
                      setReplyDrafts((current) => ({
                        ...current,
                        [review.id]: event.target.value,
                      }))
                    }
                    placeholder="Reply to this review (submitted for approval)..."
                    className="min-h-[84px] border-border bg-background"
                  />
                  <Button
                    type="button"
                    disabled={isPending}
                    onClick={() => submitReply(review.id)}
                    className="self-start rounded-xl px-5 text-[10px] font-black uppercase tracking-[0.25em]"
                  >
                    Send
                  </Button>
                </div>
              </div>
            )}

          {review.children && review.children.length > 0 && (
            <div className="mt-6 space-y-4 border-t border-border/60 pt-6">
              {review.children.map((child) => renderReviewCard(child, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      id="reviews"
      className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="relative space-y-8 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="absolute right-0 top-0 p-8 opacity-5">
          <MessageSquare className="h-24 w-24" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-1.5 rounded-full bg-primary" />
          <h3 className="text-2xl font-black uppercase tracking-tighter">
            Community Reviews
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <div className="rounded-2xl border border-border bg-background p-6 text-center">
              <span className="text-sm font-bold uppercase text-muted-foreground">
                Your Rating
              </span>
              <div className="my-2 text-5xl font-black italic text-primary">
                {rating[0]}
              </div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.round(rating[0] / 2)
                      ? "fill-primary text-primary"
                      : "text-muted"
                      }`}
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
              disabled={!user}
            />
            {!user && (
              <p className="text-center text-[10px] text-muted-foreground">
                Sign in to submit a rating and review.
              </p>
            )}
          </div>

          <div className="space-y-4 md:col-span-3">
            <Textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write your cinematic analysis..."
              className="min-h-[140px] resize-none rounded-2xl border-border bg-background focus-visible:ring-primary"
              disabled={!user}
            />
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="Add review tags, separated by commas"
              className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50"
              disabled={!user}
            />

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3 rounded-full border border-border bg-background px-4 py-2">
                <Switch
                  id="spoiler-mode"
                  checked={isSpoiler}
                  onCheckedChange={setIsSpoiler}
                  disabled={!user}
                />
                <label
                  htmlFor="spoiler-mode"
                  className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase"
                >
                  <ShieldAlert
                    className={`h-4 w-4 ${isSpoiler ? "text-red-500" : "text-muted-foreground"
                      }`}
                  />
                  Contains Spoilers
                </label>
              </div>

              <Button
                disabled={!user || !comment.trim() || isPending}
                onClick={submitReview}
                className="rounded-xl bg-primary px-8 font-bold uppercase italic text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105"
              >
                <Send className="mr-2 h-4 w-4" /> Post Review
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
            {reviews.length} Active Reviews
          </Badge>
        </div>

        <div className="grid gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => renderReviewCard(review, 0))
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/20 py-20 text-center">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted" />
              <p className="font-medium text-muted-foreground">
                No reviews yet. Be the first to rate this title!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
