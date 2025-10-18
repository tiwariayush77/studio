import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, AlertTriangle, Lightbulb, Copy, Pencil } from "lucide-react";
import type { Deal } from "@/lib/types";

const emailDraft = `Hi John,

Thanks for the great conversation today. Based on our discussion, I understand your main pain points are integration challenges with legacy systems and ensuring the solution fits within your Q1 budget.

I've attached a case study showing how TechCorp solved similar integration challenges and achieved 40% ROI in their first quarter.

Next steps:
- I'll send over pricing options by Thursday
- Let's schedule a demo with your CFO next week`;

export function CoachingSidebar({ deal }: { deal: Deal }) {
  return (
    <div className="space-y-4 sticky top-24">
      <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-600">
        <h3 className="text-lg font-semibold text-red-900 flex items-center gap-2">
            <AlertTriangle /> High Risk
        </h3>
        <p className="text-3xl font-bold text-red-600 mt-2">{deal.riskScore}/100</p>
        <p className="text-sm text-red-800 mt-1">Why: {deal.rootCauses[2]}</p>
      </div>
      
      <Card className="bg-purple-50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="text-purple-600" /> AI Coaching Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="flex items-start gap-2"><Lightbulb className="w-4 h-4 mt-0.5 text-purple-600 flex-shrink-0" /> Budget signal detected at 28:30 but not qualified</p>
          <p className="flex items-start gap-2"><Lightbulb className="w-4 h-4 mt-0.5 text-purple-600 flex-shrink-0" /> Good discovery pacing - 15 questions in first 20 mins</p>
          <p className="flex items-start gap-2"><Lightbulb className="w-4 h-4 mt-0.5 text-purple-600 flex-shrink-0" /> CFO mentioned but not invited to next meeting</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Next Steps</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <div>
                <p className="font-medium text-sm">1. {deal.recommendedAction}</p>
                <Button size="sm" variant="secondary" className="mt-1">Create Task</Button>
            </div>
            <div>
                <p className="font-medium text-sm">2. Send budget qualification checklist to Sarah</p>
                <Button size="sm" variant="secondary" className="mt-1">Send Now</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle className="text-base">AI-Generated Follow-Up</CardTitle></CardHeader>
        <CardContent>
            <Textarea readOnly value={emailDraft} className="h-48 text-sm bg-gray-50" />
            <div className="flex items-center gap-2 mt-2">
                <Button size="sm" variant="outline"><Copy className="w-3 h-3 mr-2" /> Copy</Button>
                <Button size="sm" variant="outline"><Pencil className="w-3 h-3 mr-2" /> Edit</Button>
                <Button size="sm">Send via Salesforce</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
