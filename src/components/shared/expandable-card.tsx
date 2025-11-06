import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ExpandableCardProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export default function ExpandableCard({
  title,
  defaultExpanded = false,
  children,
}: ExpandableCardProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultExpanded ? 'item-1' : ''}>
      <AccordionItem value="item-1" className="border-none bg-card rounded-xl overflow-hidden">
        <AccordionTrigger className="px-6 py-4 text-lg font-semibold hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent className="px-6">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
