import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export const FAQSection = () => (
  <section className="py-20 container mx-auto px-4 max-w-3xl">
    <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-tighter">
      Frequently Asked Questions
    </h2>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How do I stream movies?</AccordionTrigger>
        <AccordionContent>
          Once you purchase or rent a title, a Watch Now button will appear on
          the movie details page linking to our secure player.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Can I cancel my subscription anytime?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you can manage your subscription in your profile settings and
          cancel without any hidden fees.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are spoiler tags?</AccordionTrigger>
        <AccordionContent>
          When writing a review, you can toggle Spoiler Warning. This blurs
          your text for other users until they click to reveal it.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
);
