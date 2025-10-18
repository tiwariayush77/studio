import type { Deal } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Star } from "lucide-react";

export function CallHeader({ deal }: { deal: Deal }) {
  const score = 7; // Mock score
  return (
    <Card className="p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{deal.company} - {deal.product}</h1>
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-3 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Oct 16, 2025
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          42 mins
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {deal.rep.name}, John Smith (Buyer)
        </div>
        <div className="flex items-center gap-2">
            <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                <Star className="h-3 w-3" /> {score}/10
            </Badge>
        </div>
      </div>
    </Card>
  );
}
