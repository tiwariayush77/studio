"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdoptionChart } from "@/components/team-playbook/adoption-chart";
import { PlaybookBreakdown } from "@/components/team-playbook/playbook-breakdown";
import { CoachingPriorities } from "@/components/team-playbook/coaching-priorities";

export default function TeamPlaybookPage() {
    const [activePeriod, setActivePeriod] = useState("Last 30 Days");

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Team Playbook Adoption Tracker</h1>
                <p className="text-base text-gray-600 mt-2">Track which sales actions drive wins</p>
            </div>
            
            <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Time period:</span>
                 {["Last 7 Days", "Last 30 Days", "Last Quarter", "All Time"].map(period => (
                    <Button
                        key={period}
                        variant={activePeriod === period ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActivePeriod(period)}
                        className={activePeriod === period ? "bg-blue-600 text-white" : ""}
                    >
                        {period}
                    </Button>
                ))}
            </div>
            
            <div className="mt-6">
                <AdoptionChart />
            </div>

            <PlaybookBreakdown />
            
            <CoachingPriorities />
        </div>
    );
}
