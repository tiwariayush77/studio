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
    gradient: string;
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
        "p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer relative",
        colors.gradient,
        `border-l-4 ${colors.border}`,
        activeFilter === riskLevel && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={() => setFilter(activeFilter === riskLevel ? "all" : riskLevel)}
    >
      <Icon className={cn("w-7 h-7 absolute top-6 right-6 opacity-70", colors.icon)} />
      <p className={cn("text-sm font-medium uppercase tracking-wide", colors.text)}>
        {title}
      </p>
      <p className={cn("text-4xl font-bold mt-2", colors.text)}>{dealCount} deals</p>
      <p className={cn("text-base opacity-90 mt-1", colors.text)}>
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
          gradient: "bg-gradient-to-br from-red-600 to-red-500",
          border: "border-red-700",
          text: "text-white",
          icon: "text-white",
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
          gradient: "bg-gradient-to-br from-orange-500 to-yellow-400",
          border: "border-orange-600",
          text: "text-white",
          icon: "text-white",
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
          gradient: "bg-gradient-to-br from-green-600 to-green-500",
          border: "border-green-700",
          text: "text-white",
          icon: "text-white",
        }}
        activeFilter={activeFilter}
        setFilter={setFilter}
      />
    </div>
  );
}
