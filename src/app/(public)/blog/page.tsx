import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/constants/blog-posts";

export default function BlogPage() {
  const [featured, ...posts] = BLOG_POSTS;

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pb-12 pt-32 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              Editorial Journal
            </span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.82]">
              Essays, breakdowns,
              <br />
              and cinema notes.
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            A complete public blog helps the project feel portfolio-ready. This
            section turns the home-page preview into a real destination with
            featured articles and supporting analysis.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-10 lg:px-12">
        <Link
          href={`/blog/${featured.slug}`}
          className="grid gap-8 overflow-hidden rounded-[2rem] border border-border bg-card/30 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem]">
            <Image
              src={featured.coverImage}
              alt={featured.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
          <div className="flex flex-col justify-center space-y-5">
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              Featured Story
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              {featured.title}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
              <span>{featured.author}</span>
              <span>{featured.date}</span>
              <span>{featured.readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-primary">
              Read article <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[1.5rem] border border-border bg-card/20 p-5 transition-colors hover:border-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="mt-5 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary">
                  {post.category}
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  {post.title}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
