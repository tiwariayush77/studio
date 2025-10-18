"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CALL_TRANSCRIPT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Search, Smile, Zap, Check, X, Users, Trophy } from "lucide-react";

const tagStyles = {
  "pain-point": "bg-red-100 text-red-700",
  "discovery-question": "bg-blue-100 text-blue-700",
  objection: "bg-yellow-100 text-yellow-700",
  "budget-signal": "bg-yellow-100 text-yellow-700",
  "buying-signal": "bg-green-100 text-green-700",
  "next-step": "bg-purple-100 text-purple-700",
  "objection-response": "bg-indigo-100 text-indigo-700"
};

const InsightCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string}) => (
    <Card className="p-4">
        <div className="flex items-center gap-2 mb-2">
            <Icon className="h-5 w-5 text-primary" />
            <h4 className="font-semibold">{title}</h4>
        </div>
        <p className="text-sm text-text-secondary">{content}</p>
    </Card>
);

const ActionItem = ({ text, checked, impact }: { text: string, checked: boolean, impact?: string }) => (
    <div className={cn("flex items-start gap-3 p-3 rounded-lg", checked ? "bg-green-50" : "bg-red-50")}>
        {checked ? <Check className="h-5 w-5 text-green-600 mt-0.5" /> : <X className="h-5 w-5 text-red-600 mt-0.5" />}
        <div>
            <p className={cn("font-medium", checked ? "text-green-800" : "text-red-800")}>{text}</p>
            {impact && <p className="text-xs text-red-700 mt-1">Impact: {impact}</p>}
        </div>
    </div>
)

export function TranscriptView() {
  return (
    <Card className="max-h-[800px] flex flex-col">
      <Tabs defaultValue="transcript" className="flex-1 flex flex-col">
        <TabsList className="m-6 bg-muted">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="transcript" className="mt-0 p-6 space-y-4">
            <div className="sticky top-0 bg-card pb-4 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search in transcript..." className="pl-10" />
              </div>
            </div>
            {CALL_TRANSCRIPT.map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-mono text-xs">{item.time}</Badge>
                  <p className={cn("font-semibold", item.speaker === 'Sarah' ? 'text-primary' : 'text-gray-900')}>{item.speaker}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-700 mt-1 ml-16">{item.text}</p>
                {item.tags.length > 0 && (
                  <div className="flex gap-2 mt-2 ml-16">
                    {item.tags.map(tag => (
                      <Badge key={tag} className={cn("text-xs", tagStyles[tag])}>{tag.replace('-', ' ')}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="insights" className="mt-0 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InsightCard icon={Smile} title="Sentiment Analysis" content="😊 +0.7 (Positive)" />
                <InsightCard icon={Zap} title="Objections Raised" content="⚠️ Pricing concern, Integration complexity" />
                <InsightCard icon={Trophy} title="Competitors Mentioned" content="🏆 Stripe (current provider)" />
                <InsightCard icon={Users} title="Key Stakeholders" content="👥 John Smith (Champion), CFO mentioned" />
            </div>
          </TabsContent>

          <TabsContent value="actions" className="mt-0 p-6 space-y-3">
            <ActionItem text="Asked about current pain point" checked={true} />
            <ActionItem text="Identified decision-makers" checked={true} />
            <ActionItem text="Ask about budget" checked={false} impact="40% lower win rate when skipped" />
            <ActionItem text="Mentioned case study" checked={true} />
            <ActionItem text="Ask about timeline" checked={false} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
