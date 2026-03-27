import Link from "next/link";
import LoginForm from "./LoginForm";

export default function LoginPage() {

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-200%] opacity-[0.03] dark:opacity-[0.05]  animate-grain" />

        {/* Cinematic atmospheric glows */}
        <div className="absolute -top-[10%] -left-[5%] h-150 w-150 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-125 w-200 bg-primary/5 dark:bg-zinc-800/20 rounded-full blur-[100px]" />
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-0 min-h-[80vh]">
        {/* LEFT SIDE: BRANDING */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between py-16 pr-16">
          <div className="space-y-6">
            <div className="h-0.5 w-24 bg-primary" />
            <h1 className="text-[clamp(4rem,7vw,9rem)] font-black leading-[0.8] tracking-tighter text-foreground uppercase italic">
              Rate <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground to-foreground/20">
                Movies.
              </span>
            </h1>
          </div>

          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Est. 2026
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground font-medium italic">
              Every great film should seem new every time you see it.
              <span className="block mt-2 text-primary not-italic text-[10px] font-bold uppercase tracking-widest">
                — Roger Ebert
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN CONTAINER */}
        <div className="col-span-12 lg:col-span-5 relative">
          <div className="relative h-full bg-card/30 backdrop-blur-3xl border-l border-border p-8 lg:p-16 flex flex-col justify-center shadow-2xl">
            <div className="mb-12">
              <h2 className="text-4xl font-light text-foreground tracking-tight italic leading-none">
                Welcome <br />
                <span className="font-black not-italic text-primary uppercase text-3xl">
                  Back
                </span>
              </h2>
              <p className="text-muted-foreground text-xs mt-3 uppercase tracking-[0.15em] font-semibold">
                Sign in to your account
              </p>
            </div>

            <LoginForm />

            <div className="mt-12 pt-8 border-t border-border/50 text-center">
              <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary font-bold hover:underline underline-offset-4 decoration-primary/30 ml-1"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VERTICAL DECOR */}
      <div className="absolute left-6 bottom-12 hidden xl:flex flex-col gap-10 items-center opacity-20">
        <div className="h-20 w-px bg-linear-to-t from-primary to-transparent" />
        <p className="[writing-mode:vertical-rl] text-[9px] font-black uppercase tracking-[0.6em] text-foreground">
          Cinerate // Digital Archive
        </p>
      </div>
    </div>
  );
}
