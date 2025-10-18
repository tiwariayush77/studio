"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, AlertTriangle, Lightbulb, Copy, Pencil, Send, Edit } from "lucide-react";
import type { Deal } from "@/lib/types";

const emailDraft = `Hi John,

Thanks for the great conversation today. Based on our discussion, I understand your main pain points are integration challenges with legacy systems and ensuring the solution fits within your Q1 budget.

I've attached a case study showing how TechCorp solved similar integration challenges and achieved 40% ROI in their first quarter.

Next steps:
- I'll send over pricing options by Thursday
- Let's schedule a demo with your CFO next week`;

export function CoachingSidebar({ deal }: { deal: Deal }) {
  const [showFullEmail, setShowFullEmail] = useState(false);

  return (
    <div className="w-80 space-y-3 sticky top-20 h-fit">
      <div className="bg-white border-l-4 border-red-600 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-semibold text-red-900">High Risk</h3>
        </div>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-red-600">{deal.riskScore}</span>
            <span className="text-xs text-gray-500">/100</span>
        </div>
        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            {deal.rootCauses[2]}
        </p>
      </div>
      
      <div className="bg-white border border-purple-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3 className="text-sm font-semibold text-gray-900">AI Insights</h3>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Lightbulb className="w-3 h-3 mt-0.5 text-purple-600 flex-shrink-0" />
            <span className="text-xs text-gray-600 leading-relaxed">Budget signal detected at 28:30 but not qualified</span>
          </li>
           <li className="flex items-start gap-2">
            <Lightbulb className="w-3 h-3 mt-0.5 text-purple-600 flex-shrink-0" />
            <span className="text-xs text-gray-600 leading-relaxed">Good discovery pacing - 15 questions in first 20 mins</span>
          </li>
           <li className="flex items-start gap-2">
            <Lightbulb className="w-3 h-3 mt-0.5 text-purple-600 flex-shrink-0" />
            <span className="text-xs text-gray-600 leading-relaxed">CFO mentioned but not invited to next meeting</span>
          </li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Next Steps</h3>
        <div className="space-y-3">
            <div>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">{deal.recommendedAction}</p>
                <Button size="sm" variant="outline" className="w-full h-8 text-xs">Create Task</Button>
            </div>
            <div>
                <p className="text-xs text-gray-700 leading-relaxed mb-2">Send budget qualification checklist to Sarah</p>
                <Button size="sm" variant="outline" className="w-full h-8 text-xs">Send Now</Button>
            </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">
              AI-Generated Follow-Up
            </h3>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setShowFullEmail(!showFullEmail)}
              className="h-6 px-2 text-xs"
            >
              {showFullEmail ? 'Collapse ↑' : 'Expand ↓'}
            </Button>
          </div>
          
          {!showFullEmail ? (
            <p className="text-xs text-gray-600 leading-relaxed">
              Hi John, Thanks for the great conversation today. Based on our discussion...
              <span className="text-blue-600 cursor-pointer ml-1" 
                    onClick={() => setShowFullEmail(true)}>
                Read more
              </span>
            </p>
          ) : (
            <>
              <Textarea 
                readOnly
                className="w-full h-40 text-xs border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={emailDraft}
              />
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700">
                  <Send className="w-3 h-3 mr-1" />
                  Send
                </Button>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
