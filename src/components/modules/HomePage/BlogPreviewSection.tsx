import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";

// TODO: fetch from backend → GET /api/blog?limit=3&sort=date

export function BlogPreviewSection() {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-20">
      <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">
          From the <span className="text-primary not-italic">Press.</span>
        </h2>
        <Link
          href="/blog"
          className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-colors mb-2 flex items-center gap-1"
        >
          All Articles <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_BLOG_POSTS.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col"
          >
            {/* Cover */}
            <div className="relative aspect-video overflow-hidden bg-muted mb-5">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale-[0.3] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors" />
              <div className="absolute top-3 left-3">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] bg-primary text-primary-foreground px-2 py-1">
                  {post.category}
                </span>
              </div>
              {i === 0 && (
                <div className="absolute bottom-3 right-3">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-background/80 backdrop-blur-sm text-foreground border border-border px-2 py-1">
                    Editor&apos;s Choice
                  </span>
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={post.authorImage}
                alt={post.author}
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                {post.author}
              </span>
              <span className="text-[9px] text-muted-foreground/50">·</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-black italic tracking-tighter text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
              {post.title}
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {post.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-primary">
              Read Article
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
