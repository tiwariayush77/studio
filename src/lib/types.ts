export type Rep = {
  id: number;
  name: string;
  avatar: string;
  title: string;
  email: string;
  phone: string;
  adoption: number;
  score: number;
  winRate: number;
  avgDealSize: number;
  activeDeals: number;
  rank: number;
  trends: {
    adoption: "up" | "down" | "stable";
    score: "up" | "down" | "stable";
    winRate: "up" | "down" | "stable";
  };
  strengths: string[];
  improvements: string[];
  recentCalls?: {
    id: number;
    date: string;
    company: string;
    score: number;
    duration: number;
    sentiment: "positive" | "neutral" | "negative";
  }[];
};

export type Deal = {
  id: number;
  company: string;
  product: string;
  value: number;
  stage: "Discovery" | "Demo" | "Negotiation";
  daysInStage: number;
  rep: {
    id: number;
    name: string;
    avatar: string;
  };
  riskScore: number;
  riskLevel: "high" | "medium" | "low";
  rootCauses: string[];
  recommendedAction: string;
  lastActivity: string;
  competitor: string | null;
  hasChampion: boolean;
};

export type CallTranscriptItem = {
  time: string;
  speaker: string;
  text: string;
  tags: ("pain-point" | "discovery-question" | "objection" | "budget-signal" | "objection-response" | "buying-signal" | "next-step")[];
};

export type PlaybookAction = {
  action: string;
  completion: number;
  impact: number;
};
