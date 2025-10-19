
"use client";

import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Target,
  X,
  Info,
  Check,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Deal } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const riskStyles = {
  high: "border-red-600",
  medium: "border-yellow-600",
  low: "border-green-600",
};

const riskGradientStyles = {
    high: "bg-gradient-to-br from-red-600 to-red-700",
    medium: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    low: "bg-gradient-to-br from-green-500 to-green-600",
}

const trendIcon = (trend: 'up' | 'down' | 'stable') => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-red-300" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-green-300" />;
    default:
      return <ArrowRight className="w-4 h-4 text-gray-300" />;
  }
}

const trendText = (trend: 'up' | 'down' | 'stable', change: number) => {
  if (change === 0) return "Stable";
  const sign = change > 0 ? '+' : '';
  const color = trend === 'up' ? 'text-red-300' : 'text-green-300';
  return <span className={color}>{sign}{change}</span>;
}


export function DealCard({ deal }: { deal: Deal }) {
  const riskLevel = deal.riskLevel;
  const currentRiskStyle = riskStyles[riskLevel];
  const currentRiskGradient = riskGradientStyles[riskLevel];

  return (
    <Card
      className={cn(
        "p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4",
        currentRiskStyle
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap flex-1 mr-4">
          <Link href={`/call-analysis/${deal.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
              {deal.company} - {deal.product}
            </h3>
          </Link>
          <Badge className="bg-green-600 text-white hover:bg-green-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
            ${(deal.value / 1000).toFixed(0)}K
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-[11px] px-2.5 py-0.5 rounded-full">
            {deal.stage}
          </Badge>
          <Badge variant="secondary" className="bg-gray-50 text-gray-500 text-[11px] px-2.5 py-0.5 rounded-full">
            {deal.daysInStage} days
          </Badge>
          <Link href={`/rep-scorecard/${deal.rep.id}`} className="text-blue-600 hover:underline text-xs font-medium">
            Rep: {deal.rep.name} →
          </Link>
        </div>
        <div className={cn("w-28 h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0", currentRiskGradient)}>
            <div className="flex items-center gap-1.5">
              {trendIcon(deal.riskTrend)}
              <span className="text-xl font-bold text-white leading-none">{deal.riskScore}</span>
              <span className="text-sm font-semibold text-white/80 leading-none">
                {trendText(deal.riskTrend, deal.riskScoreChange)}
              </span>
            </div>
            <p className="text-[9px] text-white/70 mt-0.5">Risk Score</p>
        </div>
      </div>

      <div className="bg-gray-50/80 p-2 rounded-md mb-3 text-center">
        <p className="text-xs text-gray-600">
            <Sparkles className="w-3 h-3 text-yellow-500 inline-block mr-1" />
            AI Insight: Score changed because <span className="font-semibold text-gray-800">{deal.scoreChangeReason}</span>
        </p>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Root Causes:
        </h4>
        <div className="space-y-2">
          {deal.rootCauses.map((cause, index) => (
            <div key={index} className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 font-medium leading-relaxed">{cause}</span>
            </div>
          ))}
        </div>
      </div>

       <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Playbook Status</h4>
        <div className="flex items-center gap-4">
          <div className="w-full">
            <Progress value={deal.playbook.completion} className="h-2" />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-600">Next Step: <span className="font-semibold text-gray-800">{deal.playbook.nextStep}</span></p>
              <p className="text-xs font-semibold text-gray-800">{deal.playbook.completion}% complete</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <h4 className="text-sm font-semibold text-gray-700">
            Recommended Action:
          </h4>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <button className="w-3.5 h-3.5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-help transition-colors">
                  <Info className="w-2.5 h-2.5 text-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-gray-900 text-white text-xs p-3 rounded-lg max-w-xs leading-relaxed">
                <p className="font-semibold mb-1">AI Recommendation Details</p>
                 <ul className="list-disc pl-4 mt-2 space-y-1">
                  <li>Confidence: {deal.recommendedAction.confidence}%</li>
                  <li>Historical Success: {deal.recommendedAction.historicalSuccess}</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-yellow-50 border-l-3 border-yellow-500 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-yellow-700 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-medium text-yellow-900 leading-snug">{deal.recommendedAction.text}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex gap-2">
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 text-xs">
              <Link href={`/call-analysis/${deal.id}`}>
                  <Phone className="w-3.5 h-3.5 mr-1.5" /> View Call
              </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Coach
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Coach {deal.rep.name} on {deal.company} Deal</DialogTitle>
                <DialogDescription>
                  Provide a quick coaching note or suggest an action.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="coaching-note">Coaching Note</Label>
                  <Textarea id="coaching-note" placeholder="E.g., Let's roleplay budget conversations tomorrow." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send Note</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Check className="w-3.5 h-3.5 mr-1.5" /> Safe
          </Button>
        </div>
        <p className="text-[11px] text-gray-500">{deal.lastActivity}</p>
      </div>
    </Card>
  );
}
