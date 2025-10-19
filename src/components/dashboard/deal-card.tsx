
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
  Minus,
  Sparkles,
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

const riskStyles = {
  high: "border-red-600",
  medium: "border-yellow-600",
  low: "border-green-600",
};

const riskBgStyles = {
    high: "bg-red-600",
    medium: "bg-yellow-500",
    low: "bg-green-500",
}

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

export function DealCard({ deal }: { deal: Deal }) {
  const riskLevel = deal.riskLevel;
  const currentRiskStyle = riskStyles[riskLevel];
  const currentRiskBg = riskBgStyles[riskLevel];
  const TrendIcon = trendIcon[deal.riskScoreTrend];
  const scoreChangeText = deal.riskScoreTrend === 'up' 
    ? `+${deal.riskScoreChange}` 
    : deal.riskScoreTrend === 'down' 
    ? `-${deal.riskScoreChange}` 
    : `${deal.riskScoreChange}`;


  return (
    <Card
      className={cn(
        "p-5 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4",
        currentRiskStyle
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap flex-1 mr-4">
          <Link href={`/call-analysis/${deal.id}`}>
            <h3 className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors tracking-tight">
              {deal.company} - {deal.product}
            </h3>
          </Link>
          <Badge className="bg-green-600 text-white hover:bg-green-700 font-semibold text-xs px-3 py-1 rounded-full">
            ${(deal.value / 1000).toFixed(0)}K
          </Badge>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-3 py-1 rounded-l-full rounded-r-none font-semibold">
              {deal.stage}
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-r-full rounded-l-none font-bold">
              {deal.stageProgress}%
            </Badge>
          </div>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            {deal.daysInStage} days
          </Badge>
          <Link href={`/rep-scorecard/${deal.rep.id}`} className="text-blue-600 hover:underline text-sm font-medium">
            Rep: {deal.rep.name} →
          </Link>
        </div>
        <div className={cn("h-9 px-3 rounded-md flex items-center justify-center gap-1.5 flex-shrink-0 shadow-inner", currentRiskBg)}>
            <TrendIcon className="w-4 h-4 text-white/80" />
            <span className="text-lg font-bold text-white leading-none">{deal.riskScore}</span>
            {deal.riskScoreTrend !== 'stable' && (
                <span className="text-sm font-semibold text-white/80">
                    {scoreChangeText}
                </span>
            )}
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          Root Causes:
        </h4>
        <div className="space-y-2">
            <div className="flex items-start gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-900 p-2 rounded-md border-l-2 border-yellow-400">
                <Sparkles className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium leading-relaxed">{deal.aiInsight}</span>
            </div>
          {deal.rootCauses.map((cause, index) => (
            <div key={index} className="flex items-start gap-2">
              <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700 font-medium leading-relaxed">{cause}</span>
            </div>
))}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
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
                <p>AI-generated recommendation based on deal signals</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-3 border-blue-500 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-medium text-blue-900 leading-snug">{deal.recommendedAction}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
        <div className="flex gap-2">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 h-10 px-5 font-semibold text-base">
              <Link href={`/call-analysis/${deal.id}`}>
                  <Phone className="w-4 h-4 mr-2" /> View Call
              </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 px-4 text-base font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2" /> Coach
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
          <Button variant="ghost" size="sm" className="h-10 px-4 text-base font-semibold">
              <Check className="w-4 h-4 mr-2" /> Safe
          </Button>
        </div>
      </div>
    </Card>
  );
}
