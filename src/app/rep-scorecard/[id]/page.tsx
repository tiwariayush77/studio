import { REPS } from "@/lib/data";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import { RepHeaderCard } from "@/components/rep-scorecard/rep-header-card";
import { RepMetrics } from "@/components/rep-scorecard/rep-metrics";
import { RepAnalysis } from "@/components/rep-scorecard/rep-analysis";
import { RecentCalls } from "@/components/rep-scorecard/recent-calls";

export default function RepScorecardPage({ params }: { params: { id: string } }) {
  const rep = REPS.find(r => r.id === parseInt(params.id));

  if (!rep) {
    notFound();
  }
  
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-6">
        <BackButton />
        <div className="space-y-6">
            <RepHeaderCard rep={rep} />
            <RepMetrics rep={rep} />
            <RepAnalysis rep={rep} />
            <RecentCalls rep={rep} />
        </div>
    </div>
  );
}
