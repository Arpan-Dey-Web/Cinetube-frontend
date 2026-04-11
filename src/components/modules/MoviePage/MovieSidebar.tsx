import {
  CheckCircle2,
  CreditCard,
  Info,
  Star,
  Timer,
  Tv,
  User,
  Video,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const MovieSidebar = ({
  cast,
  director,
  duration,
  platform,
  rating,
  year,
  status,
  price,
  hasAccess,
}: {
  cast: string[];
  director: string;
  duration: string;
  platform: string;
  rating: number;
  year: string;
  status: string;
  price?: number;
  hasAccess: boolean;
}) => (
  <div
    id="checkout-card"
    className="bg-card/50 border border-border p-8 rounded-2xl sticky top-24 space-y-8 backdrop-blur-sm shadow-xl"
  >
    {/* Director Section */}
    <div>
      <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4">
        <Video className="h-4 w-4" /> Director
      </h4>
      <p className="text-lg font-bold text-foreground tracking-tight">
        {director}
      </p>
    </div>

    <Separator className="bg-border/50" />

    {/* Cast Section */}
    <div>
      <h4 className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4">
        <User className="h-4 w-4" /> Starring
      </h4>
      <ul className="space-y-4">
        {cast.map((actor) => (
          <li
            key={actor}
            className="group flex items-center justify-between cursor-default"
          >
            <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
              {actor}
            </span>
            <div className="h-1 w-1 rounded-full bg-border group-hover:bg-primary group-hover:scale-150 transition-all" />
          </li>
        ))}
      </ul>
    </div>

    <Separator className="bg-border/50" />

    <div>
      <h4 className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
        <Tv className="h-4 w-4" /> Key Information
      </h4>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Platform</span>
          <span className="font-semibold text-foreground">{platform}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Duration</span>
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <Timer className="h-4 w-4 text-primary" />
            {duration}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Rating</span>
          <span className="flex items-center gap-2 font-semibold text-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            {rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Release</span>
          <span className="font-semibold text-foreground">{year}</span>
        </div>
      </div>
    </div>

    <Separator className="bg-border/50" />

    {/* Access & Purchase Section */}
    <div className="pt-2">
      {status === "PREMIUM" && !hasAccess ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex justify-between items-center bg-primary/10 p-5 rounded-2xl border border-primary/20">
            <div>
              <p className="text-[10px] font-black uppercase text-primary tracking-tighter">
                One-time Purchase
              </p>
              <p className="text-xs text-muted-foreground">Lifetime Access</p>
            </div>
            <span className="text-3xl font-black text-primary italic">
              ${price ?? 0}
            </span>
          </div>

          <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase italic tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20">
            <CreditCard className="mr-2 h-5 w-5" /> Purchase Now
          </Button>

          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
            Secure checkout powered by Stripe
          </p>
        </div>
      ) : (
        <div className="bg-primary/5 border border-primary/20 p-5 rounded-2xl flex gap-4">
          <div className="shrink-0">
            {hasAccess ? (
              <CheckCircle2 className="h-6 w-6 text-primary" />
            ) : (
              <Info className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-foreground">
              {hasAccess ? "Access Granted" : "Available for Free"}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {hasAccess
                ? "You have full access to this title. You can watch it in 4K resolution anytime."
                : "This title is part of our Flicks Free library for all members."}
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
);
