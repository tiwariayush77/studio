"use client";

import { useState } from 'react';
import { DEALS } from '@/lib/data';
import type { Deal } from '@/lib/types';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DealCard } from '@/components/dashboard/deal-card';
import { TeamPerformanceSidebar } from '@/components/dashboard/team-performance-sidebar';
import { QuickActions } from '@/components/dashboard/quick-actions';

type RiskLevelFilter = "all" | "high" | "medium" | "low";

export default function DashboardPage() {
  const [riskFilter, setRiskFilter] = useState<RiskLevelFilter>("all");

  const filteredDeals = riskFilter === "all"
    ? DEALS
    : DEALS.filter(deal => deal.riskLevel === riskFilter);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      <div className="space-y-8">
        <SummaryCards deals={DEALS} activeFilter={riskFilter} setFilter={setRiskFilter} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
             <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-2 gap-4">
                {filteredDeals.map((deal: Deal) => (
                    <DealCard key={deal.id} deal={deal} />
                ))}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <TeamPerformanceSidebar />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
