import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PriorityCard = ({
    title,
    stats,
    reps,
    bgColor,
    borderColor
}: {
    title: string;
    stats: string;
    reps: string;
    bgColor: string;
    borderColor: string;
}) => (
    <Card className={`${bgColor} ${borderColor} border-l-4 p-5`}>
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-text-secondary mt-1">{stats}</p>
        <p className="text-sm text-text-secondary mt-2">{reps}</p>
        <Button size="sm" variant="outline" className="mt-3 bg-white">Create Team Training</Button>
    </Card>
);

export function CoachingPriorities() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 3 Coaching Priorities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PriorityCard
          title="🎯 Budget Qualification"
          stats="54% completion | +18% win rate impact"
          reps="Sarah, Jessica, David need coaching"
          bgColor="bg-red-50"
          borderColor="border-red-600"
        />
        <PriorityCard
          title="🎯 Multi-Threading"
          stats="48% completion | +14% impact"
          reps="Tom, David need coaching"
          bgColor="bg-yellow-50"
          borderColor="border-yellow-600"
        />
        <PriorityCard
          title="🎯 Technical Stakeholder Engagement"
          stats="62% completion | +12% impact"
          reps="John, Rachel need coaching"
          bgColor="bg-orange-50"
          borderColor="border-orange-600"
        />
      </div>
    </div>
  );
}
