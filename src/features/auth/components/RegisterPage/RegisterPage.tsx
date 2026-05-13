import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-[-200%] opacity-[0.03] dark:opacity-[0.05]  animate-grain" />
        <div className="absolute -bottom-[10%] -left-[5%] h-150 w-150 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] h-125 w-200 bg-primary/5 dark:bg-zinc-800/20 rounded-full blur-[100px]" />
      </div>

      {/* Tighter Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-0 min-h-[75vh]">
        {/* LEFT SIDE: BRANDING (Shortened) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between py-12 pr-16">
          <div className="space-y-4">
            <div className="h-0.5 w-16 bg-primary" />
            <h1 className="text-[clamp(4rem,8vw,10rem)] font-black leading-[0.7] tracking-tighter text-foreground uppercase italic">
              Join <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground to-foreground/20">
                Us.
              </span>
            </h1>
          </div>

          <div className="space-y-4 max-w-xs">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Discovery
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground font-medium italic">
              Step into the archive. Experience cinema curated by you.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: THE FORM CONTAINER */}
        <div className="col-span-12 lg:col-span-5 relative">
          {/* Reduced padding to bring the form up */}
          <div className="relative h-full bg-card/30 backdrop-blur-3xl border-l border-border p-8 lg:p-12 flex flex-col justify-center shadow-2xl">
            <div className="mb-8">
              <h2 className="text-4xl font-light text-foreground tracking-tight italic leading-none">
                New <br />
                <span className="font-black not-italic text-primary uppercase text-3xl">
                  Account
                </span>
              </h2>
            </div>
            {/* Register form  */}
            <RegisterForm />

            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline underline-offset-4 ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
