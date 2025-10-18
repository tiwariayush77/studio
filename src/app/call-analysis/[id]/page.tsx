import { DEALS } from "@/lib/data";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import { CallHeader } from "@/components/call-analysis/call-header";
import { TranscriptView } from "@/components/call-analysis/transcript-view";
import { CoachingSidebar } from "@/components/call-analysis/coaching-sidebar";

export default function CallAnalysisPage({ params }: { params: { id: string } }) {
  const deal = DEALS.find(d => d.id === parseInt(params.id));

  if (!deal) {
    notFound();
  }
  
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
        <BackButton />
        <CallHeader deal={deal} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div className="lg:col-span-1 bg-white rounded-lg p-6 shadow-sm">
                <TranscriptView />
            </div>
            <aside className="w-[300px] space-y-3 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
                <CoachingSidebar deal={deal} />
            </aside>
        </div>
    </div>
  );
}
