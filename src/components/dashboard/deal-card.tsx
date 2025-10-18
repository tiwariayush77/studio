"use client";

import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Target,
  X,
  Info,
  Check
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
  high: {
    border: "border-red-600",
    dot: "bg-red-600",
    gradient: "bg-gradient-to-br from-red-600 to-red-700",
  },
  medium: {
    border: "border-yellow-600",
    dot: "bg-yellow-600",
    gradient: "bg-gradient-to-br from-yellow-600 to-yellow-700",
  },
  low: {
    border: "border-green-600",
    dot: "bg-green-600",
    gradient: "bg-gradient-to-br from-green-600 to-green-700",
  },
};

export function DealCard({ deal }: { deal: Deal }) {
  const currentRiskStyle = riskStyles[deal.riskLevel];

  return (
    <Card
      className={cn(
        "p-6 shadow-sm hover:shadow-md transition-all duration-200",
        currentRiskStyle.border,
        "border-l-4"
      )}
    >
      {/* ROW 1 - HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
            <p className="text-xl font-semibold text-gray-900">
              {deal.company} - {deal.product}
            </p>
            <Badge className="bg-green-600 text-white hover:bg-green-700 text-xs font-medium px-3 py-1 rounded-full">
              ${(deal.value / 1000).toFixed(0)}K
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium px-3 py-1 rounded-full">
              {deal.stage}
            </Badge>
            <Badge variant="secondary" className="bg-gray-50 text-gray-500 hover:bg-gray-100 text-xs px-3 py-1 rounded-full">
              {deal.daysInStage} days in {deal.stage}
            </Badge>
            <Link href={`/rep-scorecard/${deal.rep.id}`} className="text-blue-600 hover:underline text-sm font-medium ml-2 cursor-pointer">
              Rep: {deal.rep.name} &rarr;
            </Link>
        </div>
        <div className={cn("w-16 h-16 rounded-full flex flex-col items-center justify-center flex-shrink-0 ml-4", currentRiskStyle.gradient)}>
            <p className="text-2xl font-bold text-white">{deal.riskScore}</p>
            <p className="text-xs text-white/80 -mt-1">/100</p>
        </div>
      </div>
      
      {/* ROW 2 - CONTENT */}
      <div className="mt-4 grid grid-cols-[2fr_1fr] gap-6">
         <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Root Causes Identified:</p>
            <ul className="space-y-2 mt-2">
              {deal.rootCauses.map((cause, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
           <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">Recommended Action:</span>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <button className="w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-help transition-colors">
                        <Info className="w-3 h-3 text-gray-600" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-900 text-white text-xs p-3 rounded-lg max-w-xs leading-relaxed">
                      <p className="font-semibold mb-1">Why this action?</p>
                      <p>Based on analysis of 1,247 similar deals:</p>
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>Deals with executive sponsors close <strong>40% more often</strong></li>
                        <li>CFO engagement in discovery increases win rate by <strong>23%</strong></li>
                        <li>Multi-threading reduces deal risk by <strong>31%</strong></li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg flex items-start gap-3">
                <Target className="text-yellow-700 w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-yellow-900">{deal.recommendedAction}</p>
              </div>
           </div>
      </div>
      
      {/* ROW 3 - FOOTER */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link href={`/call-analysis/${deal.id}`}>
                  <Phone /> View Call
              </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                  <MessageCircle /> Coach Rep
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
           <Button variant="ghost" size="sm" className="text-gray-600">
              <Check /> Mark Safe
          </Button>
        </div>
        <p className="text-xs text-gray-500">Last activity: {deal.lastActivity}</p>
      </div>
    </Card>
  );
}
