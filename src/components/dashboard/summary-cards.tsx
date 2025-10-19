"use client";

import { Card } from "@/components/ui/card";
import { AlertCircle, PauseCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "high" | "medium" | "low" | "all";

type SummaryCardProps = {
  riskLevel: "high" | "medium" | "low";
  title: string;
  dealCount: number;
  value: number;
  icon: React.ElementType;
  colors: {
    bg: string;
    border: string;
    text: string;
    icon: string;
  };
  activeFilter: RiskLevel;
  setFilter: (filter: RiskLevel) => void;
};

const SummaryCard = ({
  riskLevel,
  title,
  dealCount,
  value,
  icon: Icon,
  colors,
  activeFilter,
  setFilter,
}: SummaryCardProps) => {
  const getSubtitle = () => {
    switch (riskLevel) {
      case "high":
        return "needs immediate attention";
      case "medium":
        return "requires monitoring";
      case "low":
        return "tracking well";
      default:
        return "at risk";
    }
  };

  return (
    <Card
      className={cn(
        "p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative",
        colors.bg,
        `border-l-4 ${colors.border}`,
        activeFilter === riskLevel && "ring-2 ring-primary"
      )}
      onClick={() => setFilter(activeFilter === riskLevel ? "all" : riskLevel)}
    >
      <Icon className={cn("w-7 h-7 absolute top-6 right-6 opacity-70", colors.icon)} />
      <p className={cn("text-sm font-medium uppercase tracking-wide", colors.text)}>
        {title}
      </p>
      <p className={cn("text-4xl font-bold mt-2", colors.text)}>{dealCount} deals</p>
      <p className="text-base text-text-secondary mt-1">
        ${(value / 1000).toFixed(0)}K {getSubtitle()}
      </p>
    </Card>
  );
};

type SummaryCardsProps = {
  deals: { riskLevel: RiskLevel; value: number }[];
  activeFilter: RiskLevel;
  setFilter: (filter: RiskLevel) => void;
};

export function SummaryCards({ deals, activeFilter, setFilter }: SummaryCardsProps) {
  const highRiskDeals = deals.filter((d) => d.riskLevel === "high");
  const mediumRiskDeals = deals.filter((d) => d.riskLevel === "medium");
  const lowRiskDeals = deals.filter((d) => d.riskLevel === "low");

  const highRiskValue = highRiskDeals.reduce((sum, d) => sum + d.value, 0);
  const mediumRiskValue = mediumRiskDeals.reduce((sum, d) => sum + d.value, 0);
  const lowRiskValue = lowRiskDeals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard
        riskLevel="high"
        title="High Risk"
        dealCount={highRiskDeals.length}
        value={highRiskValue}
        icon={AlertCircle}
        colors={{
          bg: "bg-red-50",
          border: "border-red-600",
          text: "text-red-600",
          icon: "text-red-600",
        }}
        activeFilter={activeFilter}
        setFilter={setFilter}
      />
      <SummaryCard
        riskLevel="medium"
        title="Medium Risk"
        dealCount={mediumRiskDeals.length}
        value={mediumRiskValue}
        icon={PauseCircle}
        colors={{
          bg: "bg-yellow-50",
          border: "border-yellow-600",
          text: "text-yellow-600",
          icon: "text-yellow-600",
        }}
        activeFilter={activeFilter}
        setFilter={setFilter}
      />
      <SummaryCard
        riskLevel="low"
        title="Low Risk"
        dealCount={lowRiskDeals.length}
        value={lowRiskValue}
        icon={CheckCircle}
        colors={{
          bg: "bg-green-50",
          border: "border-green-600",
          text: "text-green-600",
          icon: "text-green-600",
        }}
        activeFilter={activeFilter}
        setFilter={setFilter}
      />
    </div>
  );
}
