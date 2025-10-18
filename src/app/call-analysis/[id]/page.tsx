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
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="lg:col-span-1">
                <TranscriptView />
            </div>
            <div className="lg:col-span-1">
                <CoachingSidebar deal={deal} />
            </div>
        </div>
    </div>
  );
}
