import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { SUPPORT_CHANNELS } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pb-12 pt-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
              Contact
            </span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.82]">
              Let&apos;s solve account, access,
              <br />
              or moderation issues quickly.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              A functional footer needs real destinations behind it. This page
              gives the portal a proper support endpoint with direct actions,
              availability info, and contact channels that are actually usable.
            </p>
          </div>

          <div className="rounded-[2rem] border border-border bg-card/30 p-8">
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                <p>Cinetube Media Lab, Dhaka 1212, Bangladesh</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-primary" />
                <p>+880 1700-000000</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 h-4 w-4 text-primary" />
                <p>Saturday to Thursday, 10:00 AM to 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          {SUPPORT_CHANNELS.map((channel) => (
            <div
              key={channel.title}
              className="rounded-[1.5rem] border border-border bg-card/20 p-6"
            >
              <channel.icon className="h-7 w-7 text-primary" />
              <h2 className="mt-5 text-2xl font-black uppercase tracking-tight">
                {channel.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {channel.description}
              </p>
              <Link
                href={channel.href}
                className="mt-6 inline-flex text-[10px] font-black uppercase tracking-[0.35em] text-primary"
              >
                {channel.action}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
