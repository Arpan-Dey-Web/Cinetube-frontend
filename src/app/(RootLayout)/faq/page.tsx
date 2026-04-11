import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS, SUPPORT_CHANNELS } from "@/lib/site-content";
import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pb-12 pt-32 lg:px-12">
        <div className="max-w-3xl space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            FAQ
          </span>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black uppercase tracking-tighter leading-[0.82]">
            The fast answers page.
          </h1>
          <p className="text-base leading-8 text-muted-foreground">
            This route supports the footer and gives the project one more
            complete public destination beyond the landing page and browse flow.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="rounded-[1.75rem] border border-border bg-card/20 p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-left text-lg font-black uppercase tracking-tight">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="space-y-4 rounded-[1.75rem] border border-border bg-card/20 p-6 md:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.45em] text-primary">
            Still Need Help
          </p>
          {SUPPORT_CHANNELS.map((channel) => (
            <Link
              key={channel.title}
              href={channel.href}
              className="block rounded-[1rem] border border-border bg-background/80 p-5 transition-colors hover:border-primary/40"
            >
              <p className="text-lg font-black uppercase tracking-tight text-foreground">
                {channel.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {channel.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
