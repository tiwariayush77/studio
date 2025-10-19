"use client";

import { useState } from 'react';
import { DEALS } from '@/lib/data';
import type { Deal } from '@/lib/types';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DealCard } from '@/components/dashboard/deal-card';
import { TeamPerformanceSidebar } from '@/components/dashboard/team-performance-sidebar';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { AIPatternsCard } from '@/components/dashboard/ai-patterns-card';

type RiskLevelFilter = "all" | "high" | "medium" | "low";

export default function DashboardPage() {
  const [riskFilter, setRiskFilter] = useState<RiskLevelFilter>("all");

  const filteredDeals = riskFilter === "all"
    ? DEALS
    : DEALS.filter(deal => deal.riskLevel === riskFilter);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <SummaryCards deals={DEALS} activeFilter={riskFilter} setFilter={setRiskFilter} />
          </div>
          <AIPatternsCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="flex flex-col gap-4">
            {filteredDeals.map((deal: Deal) => (
                <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
          <aside className="lg:sticky lg:top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto space-y-4">
            <TeamPerformanceSidebar />
            <QuickActions />
          </aside>
        </div>
      </div>
    </div>
  );
}
