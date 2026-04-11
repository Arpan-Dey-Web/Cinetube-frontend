import { Badge } from "@/components/ui/badge";
import { MOCK_ADMIN_MOVIES, MOCK_USER_REVIEWS } from "@/lib/mock-data";

export default function DashboardReviewsPage() {
  const approved = MOCK_USER_REVIEWS.filter((review) => review.status === "APPROVED");
  const pending = MOCK_USER_REVIEWS.filter((review) => review.status === "PENDING");

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Reviews", value: MOCK_USER_REVIEWS.length },
          { label: "Approved", value: approved.length },
          { label: "Pending", value: pending.length },
        ].map((item) => (
          <div key={item.label} className="border border-border bg-card/20 p-5">
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black italic tracking-tight text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.5rem] border border-border bg-card/20 p-6">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          My Reviews
        </h1>
        <div className="mt-6 space-y-4">
          {MOCK_USER_REVIEWS.map((review) => {
            const movieTitle =
              MOCK_ADMIN_MOVIES.find((movie) => movie.id === review.movieId)?.title ??
              review.movieId;

            return (
              <div
                key={review.id}
                className="rounded-[1rem] border border-border bg-background/70 p-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-black uppercase tracking-tight text-foreground">
                      {movieTitle}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                      Submitted {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{review.rating}/10</Badge>
                    <Badge>{review.status}</Badge>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
