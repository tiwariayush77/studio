"use client";

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Rep } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type MetricCardProps = {
    label: string;
    value: string;
    trend: "up" | "down" | "stable";
    trendValue?: string;
};

const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === 'up') return <TrendingUp className="text-green-600" />;
    if (trend === 'down') return <TrendingDown className="text-red-600" />;
    return <Minus className="text-gray-500" />;
}

const MetricCard = ({ label, value, trend, trendValue }: MetricCardProps) => (
    <Card className="p-4 shadow-sm border border-gray-200">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center gap-1 mt-2">
            <TrendIcon trend={trend} />
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>{trendValue}</span>
            <span className="text-xs text-gray-500">vs last period</span>
        </div>
    </Card>
);

export function RepMetrics({ rep }: { rep: Rep }) {
    const [activePeriod, setActivePeriod] = useState("30 Days");

    return (
        <div>
            <div className="mt-6 flex gap-2">
                {["7 Days", "30 Days", "90 Days", "All Time"].map(period => (
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

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard label="Playbook Adoption" value={`${rep.adoption}%`} trend={rep.trends.adoption} trendValue={rep.trends.adoption === 'up' ? '+5.2%' : '-2.1%'} />
                <MetricCard label="Win Rate" value={`${rep.winRate}%`} trend={rep.trends.winRate} trendValue={rep.trends.winRate === 'up' ? '+2.0%' : '-3.5%'}/>
                <MetricCard label="Avg Deal Size" value={`$${(rep.avgDealSize / 1000).toFixed(0)}K`} trend="up" trendValue="+1.5K"/>
                <MetricCard label="Active Deals" value={`${rep.activeDeals}`} trend="stable" trendValue="-1" />
            </div>
        </div>
    );
}
