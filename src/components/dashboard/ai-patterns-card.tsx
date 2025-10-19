import { Card } from "@/components/ui/card";
import { Lightbulb, BarChart3, Users, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

const insights = [
    {
        icon: Lightbulb,
        text: "Budget calls → 34% faster close",
        subtext: "Confidence: 89%",
        color: "text-yellow-500",
    },
    {
        icon: BarChart3,
        text: "ROI calculator → 18% larger deals",
        subtext: "156 deals analyzed",
        color: "text-blue-500",
    },
    {
        icon: Users,
        text: "Sarah's multi-threading improves her deals by 23%",
        subtext: "Rep specific pattern",
        color: "text-green-500",
    },
];

export function AIPatternsCard() {
    return (
        <Card className="p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-semibold text-gray-900">🧠 AI Insights</h3>
            </div>
            <div className="space-y-2 flex-1">
                {insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                        <insight.icon className={cn("w-3.5 h-3.5 mt-0.5 flex-shrink-0", insight.color)} />
                        <div>
                            <p className="font-medium text-gray-800 leading-snug">{insight.text}</p>
                            <p className="text-gray-500">{insight.subtext}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="link" size="sm" className="text-xs text-blue-600 h-auto p-0 mt-2 self-start">
                View All Insights
                <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
        </Card>
    );
}

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}
