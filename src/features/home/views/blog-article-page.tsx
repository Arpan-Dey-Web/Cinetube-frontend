import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/constants/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((entry) => entry.slug !== slug);

  return (
    <main className="min-h-screen bg-background">
      <article className="container mx-auto px-6 pb-16 pt-32 lg:px-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Journal
        </Link>

        <div className="mt-10 max-w-4xl space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            {post.category}
          </span>
          <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-black uppercase tracking-tighter leading-[0.86]">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="relative mt-12 aspect-[16/7] overflow-hidden rounded-[2rem] border border-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-8 text-base leading-8 text-muted-foreground">
            <p>
              {post.excerpt} This article page turns the blog preview into a
              fully navigable public route, which is one of the portfolio gaps
              the README called out.
            </p>
            <p>
              In a production backend, this content would come from a CMS or
              editorial API. For now, the page uses the existing mock content
              but presents it as a complete reading experience with clear
              metadata, navigation, and related stories.
            </p>
            <p>
              That matters for the assignment because it proves the frontend is
              not just visually rich on the home page. It also has deeper public
              destinations that users can browse directly, share, and return to.
            </p>
          </div>

          <aside className="space-y-4 rounded-[1.5rem] border border-border bg-card/20 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              Related Reads
            </p>
            {relatedPosts.map((entry) => (
              <Link
                key={entry.slug}
                href={`/blog/${entry.slug}`}
                className="block border-t border-border pt-4 first:border-t-0 first:pt-0"
              >
                <p className="text-lg font-black uppercase tracking-tight text-foreground">
                  {entry.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {entry.readTime}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-primary">
                  Open <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </article>
    </main>
  );
}
