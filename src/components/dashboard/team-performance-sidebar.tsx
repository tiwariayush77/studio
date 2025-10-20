"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { REPS } from '@/lib/data';
import type { Rep } from '@/lib/types';
import { cn } from '@/lib/utils';

type FilterType = "all" | "top" | "coaching";

export function TeamPerformanceSidebar() {
  const [filter, setFilter] = useState<FilterType>("all");
  const router = useRouter();

  const filteredReps = REPS.sort((a, b) => a.rank - b.rank).filter(rep => {
    if (filter === "top") return rep.adoption >= 85 && rep.winRate >= 38;
    if (filter === "coaching") return rep.adoption < 70 || rep.winRate < 30;
    return true;
  });

  const navigateToRepScorecard = (id: number) => {
    router.push(`/rep-scorecard/${id}`);
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
                Team Performance
            </h3>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="flex gap-2 mb-4">
            {(["all", "top", "coaching"] as FilterType[]).map(f => (
                <div
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200 h-9 px-3',
                        filter === f 
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold border border-blue-200 shadow-sm' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
                    )}
                >
                    {f === 'top' ? 'Top Performers' : f === 'coaching' ? 'Needs Coaching' : 'All'}
                </div>
            ))}
        </div>
        
        <div className="border-b border-gray-200 pb-2 mb-3">
            <div className="grid grid-cols-[40px_1fr_80px_80px] gap-2 px-2">
                <span className="text-xs font-semibold text-gray-600 uppercase">Rank</span>
                <span className="text-xs font-semibold text-gray-600 uppercase">Rep</span>
                <span className="text-xs font-semibold text-gray-600 uppercase text-right">Adoption</span>
                <span className="text-xs font-semibold text-gray-600 uppercase text-right">Win Rate</span>
            </div>
        </div>

        <div className="space-y-1">
            {filteredReps.map(rep => (
                <div
                    key={rep.id}
                    onClick={() => navigateToRepScorecard(rep.id)}
                    className="grid grid-cols-[40px_1fr_80px_80px] gap-2 px-2 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                    <div className="flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center">
                            {rep.rank}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-gray-700 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                            {rep.avatar}
                        </div>
                        <span className="text-sm font-medium text-blue-600 hover:underline truncate">
                            {rep.name} →
                        </span>
                    </div>
                    <div className="flex items-center justify-end">
                        <span className={cn("text-sm font-medium", 
                            rep.adoption >= 85 ? 'text-green-600' : 
                            rep.adoption >= 70 ? 'text-yellow-600' : 'text-red-600'
                        )}>
                            {rep.adoption}%
                        </span>
                    </div>
                    <div className="flex items-center justify-end">
                        <span className="text-sm font-medium text-gray-700">
                            {rep.winRate}%
                        </span>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">
                Showing {filteredReps.length} of {REPS.length} reps
            </p>
            <a 
                href="/team-playbook"
                className="text-sm text-blue-600 hover:underline font-medium"
            >
                View full team playbook →
            </a>
        </div>
    </div>
  );
}
