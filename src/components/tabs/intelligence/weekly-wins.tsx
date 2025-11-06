import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react";


interface WinCardProps {
    icon: string;
    text: string;
    subtext: string;
}

function WinCard({ icon, text, subtext }: WinCardProps) {
    return (
        <Card className="p-4 flex items-center gap-4 bg-secondary">
            <div className="text-2xl">{icon}</div>
            <div className="flex-1">
                <h4 className="font-semibold">{text}</h4>
                <p className="text-sm text-muted-foreground">{subtext}</p>
            </div>
        </Card>
    )
}

export default function WeeklyWins() {
    return (
        <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">📊 This Week's Wins</h3>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-3">
                <WinCard icon="🎯" text="Sleep improved 15%" subtext="Evening walks working!" />
                <WinCard icon="💪" text="Fitness consistency +23%" subtext="Morning routine locked" />
                <WinCard icon="🧘" text="Stress management +31%" subtext="Breathing sessions effective" />
            </CollapsibleContent>
        </Collapsible>
    )
}
