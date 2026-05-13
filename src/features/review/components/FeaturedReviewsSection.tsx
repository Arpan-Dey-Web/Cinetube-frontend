import { Star } from "lucide-react";
import { FeaturedReview, getFeaturedReviews } from "@/features/review/api/api";

export async function FeaturedReviewsSection() {
  let reviews: FeaturedReview[] = [];
  let error = false;

  try {
    reviews = await getFeaturedReviews(6);
  } catch {
    error = true;
  }

  return (
    <section className="container mx-auto px-6 lg:px-12 py-20">
      <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          Featured <span className="text-primary not-italic">Reviews.</span>
        </h2>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-2">
          Community Picks
        </span>
      </div>

      {error ? (
        <SectionState label="Unable to load featured reviews" />
      ) : reviews.length === 0 ? (
        <SectionState label="No featured reviews available" />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="border border-border bg-card/25 p-5">
              <div className="flex items-center gap-1 text-primary">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs font-black">{review.rating}/5</span>
              </div>
              <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">
                {review.comment}
              </p>
              <div className="mt-6">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">
                  {review.user.name}
                </p>
                {review.movie ? (
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {review.movie.title} · {review.movie.year}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function SectionState({ label }: { label: string }) {
  return (
    <div className="border border-border bg-card/20 p-10 text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
      {label}
    </div>
  );
}
