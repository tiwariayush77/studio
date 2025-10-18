"use client";

import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Target,
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
  return (
    <Card
      className={cn(
        "p-4 shadow-sm hover:shadow-md transition-all duration-200",
        riskStyles[deal.riskLevel].border,
        "border-l-4"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            {deal.company} - {deal.product}
          </p>
        </div>
        <div className={cn("w-14 h-14 rounded-full flex flex-col items-center justify-center flex-shrink-0 ml-4", riskStyles[deal.riskLevel].gradient)}>
            <p className="text-xl font-bold text-white">{deal.riskScore}</p>
            <p className="text-xs text-white opacity-80 -mt-1">/100</p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mt-2">
        <Badge className="bg-green-600 text-white hover:bg-green-700 text-xs font-medium rounded-full">
          ${(deal.value / 1000).toFixed(0)}K
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-medium rounded-full">
          {deal.stage}
        </Badge>
        <Badge variant="secondary" className="bg-gray-50 text-gray-500 hover:bg-gray-100 text-xs rounded-full">
          {deal.daysInStage} days in stage
        </Badge>
        <Link href={`/rep-scorecard/${deal.rep.id}`} className="text-primary hover:underline text-xs font-medium cursor-pointer">
          Rep: {deal.rep.name} &rarr;
        </Link>
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-gray-700 mb-2">Root Causes:</p>
        <ul className="space-y-1">
          {deal.rootCauses.map((cause, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", riskStyles[deal.riskLevel].dot)} />
              <span className="text-sm text-gray-600">{cause}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-lg flex items-center gap-2">
        <Target className="text-yellow-700 w-4 h-4 flex-shrink-0" />
        <p className="text-sm font-medium text-yellow-900">{deal.recommendedAction}</p>
      </div>
      
      <div className="mt-3 flex gap-2">
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
      </div>
    </Card>
  );
}
