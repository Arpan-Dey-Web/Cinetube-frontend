import { Badge } from "@/components/ui/badge";
import { MOCK_ADMIN_REVIEWS } from "@/lib/mock-data";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
          Moderation Queue
        </p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">
          Review Moderation
        </h1>
      </div>

      <div className="space-y-4">
        {MOCK_ADMIN_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="rounded-[1.5rem] border border-border bg-card/20 p-6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-black uppercase tracking-tight text-foreground">
                  {review.user.name}
                </p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
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
            <div className="mt-4 flex flex-wrap gap-2">
              {review.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
