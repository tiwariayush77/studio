import type { Deal, Rep, CallTranscriptItem, PlaybookAction } from './types';

export const DEALS: Deal[] = [
  {
    id: 1,
    company: "Acme Corp",
    product: "Enterprise Plan",
    value: 50000,
    stage: "Discovery",
    daysInStage: 18,
    rep: { id: 1, name: "Sarah Johnson", avatar: "SJ" },
    riskScore: 85,
    riskLevel: "high",
    riskTrend: "up",
    riskScoreChange: 5,
    scoreChangeReason: "Economic buyer was not identified in the last call.",
    rootCauses: [
      "No economic buyer identified (40% lower win rate when skipped)",
      "Last activity 7 days ago",
      "Rep skipped budget qualification"
    ],
    recommendedAction: {
      text: "Schedule multi-threading call with CFO by Friday",
      confidence: 85,
      historicalSuccess: "7/10 similar deals with CFO engagement move to next stage"
    },
    lastActivity: "7 days ago",
    competitor: null,
    hasChampion: false,
    playbook: {
      completion: 20,
      totalSteps: 5,
      nextStep: "Identify economic buyer"
    }
  },
  {
    id: 2,
    company: "TechStart Inc",
    product: "Growth Package",
    value: 35000,
    stage: "Demo",
    daysInStage: 12,
    rep: { id: 2, name: "John Smith", avatar: "JS" },
    riskScore: 72,
    riskLevel: "medium",
    riskTrend: "stable",
    riskScoreChange: 0,
    scoreChangeReason: "Integration concerns remain unaddressed.",
    rootCauses: [
      "Only 1 stakeholder engaged (67% lower win rate)",
      "No technical champion identified",
      "Integration concerns not addressed"
    ],
    recommendedAction: {
      text: "Schedule technical deep-dive with engineering team this week",
      confidence: 90,
      historicalSuccess: "Resolving technical blockers early increases win rate by 25%"
    },
    lastActivity: "2 days ago",
    competitor: "Salesforce",
    hasChampion: false,
    playbook: {
      completion: 60,
      totalSteps: 5,
      nextStep: "Address integration concerns"
    }
  },
  {
    id: 3,
    company: "GlobalTech Solutions",
    product: "Enterprise Plus",
    value: 75000,
    stage: "Negotiation",
    daysInStage: 8,
    rep: { id: 3, name: "Mike Davis", avatar: "MD" },
    riskScore: 45,
    riskLevel: "low",
    riskTrend: "down",
    riskScoreChange: -10,
    scoreChangeReason: "Pricing discussion started, positive signals detected.",
    rootCauses: [
      "Pricing discussion in progress",
      "ROI calculator not shared yet"
    ],
    recommendedAction: {
      text: "Send ROI calculator showing 40% time savings by EOD",
      confidence: 95,
      historicalSuccess: "Deals with ROI calculator close 30% faster"
    },
    lastActivity: "1 day ago",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 80,
      totalSteps: 5,
      nextStep: "Finalize contract"
    }
  },
  {
    id: 4,
    company: "DataFlow Systems",
    product: "Professional Plan",
    value: 28000,
    stage: "Discovery",
    daysInStage: 6,
    rep: { id: 4, name: "Jessica Chen", avatar: "JC" },
    riskScore: 38,
    riskLevel: "low",
    riskTrend: "down",
    riskScoreChange: -15,
    scoreChangeReason: "Budget confirmed and strong champion identified.",
    rootCauses: [
      "Strong champion identified",
      "Budget confirmed ($30K range)"
    ],
    recommendedAction: {
      text: "Move to demo stage - schedule for next week",
      confidence: 98,
      historicalSuccess: "85% of deals with champions at this stage proceed to demo"
    },
    lastActivity: "Today",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 40,
      totalSteps: 5,
      nextStep: "Schedule demo"
    }
  },
  {
    id: 5,
    company: "CloudScale Labs",
    product: "Enterprise Plan",
    value: 92000,
    stage: "Demo",
    daysInStage: 22,
    rep: { id: 1, name: "Sarah Johnson", avatar: "SJ" },
    riskScore: 78,
    riskLevel: "high",
    riskTrend: "up",
    riskScoreChange: 8,
    scoreChangeReason: "Demo was delayed for the 3rd time.",
    rootCauses: [
      "Demo delayed 3 times by prospect",
      "No budget discussion yet (18% lower win rate)",
      "Competitor (HubSpot) in final evaluation"
    ],
    recommendedAction: {
      text: "Ask about timeline concerns - potential red flag",
      confidence: 80,
      historicalSuccess: "Uncovering timeline issues at demo stage salvages 40% of stalled deals"
    },
    lastActivity: "5 days ago",
    competitor: "HubSpot",
    hasChampion: false,
    playbook: {
      completion: 50,
      totalSteps: 5,
      nextStep: "Confirm new demo time"
    }
  },
  {
    id: 6,
    company: "FinTech Innovations",
    product: "Growth Package",
    value: 41000,
    stage: "Negotiation",
    daysInStage: 15,
    rep: { id: 5, name: "David Martinez", avatar: "DM" },
    riskScore: 68,
    riskLevel: "medium",
    riskTrend: "up",
    riskScoreChange: 3,
    scoreChangeReason: "Legal review is taking longer than the 7-day average.",
    rootCauses: [
      "Legal review taking longer than expected",
      "Security questionnaire pending"
    ],
    recommendedAction: {
      text: "Connect with legal team to expedite - offer to answer questions live",
      confidence: 75,
      historicalSuccess: "Direct legal engagement can shorten negotiation by an average of 5 days"
    },
    lastActivity: "3 days ago",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 80,
      totalSteps: 5,
      nextStep: "Get security questionnaire approved"
    }
  },
  {
    id: 7,
    company: "RetailMax Group",
    product: "Professional Plan",
    value: 33000,
    stage: "Discovery",
    daysInStage: 4,
    rep: { id: 6, name: "Emily Park", avatar: "EP" },
    riskScore: 42,
    riskLevel: "low",
    riskTrend: "down",
    riskScoreChange: -8,
    scoreChangeReason: "VP of Sales is actively engaged.",
    rootCauses: [
      "Active engagement from VP Sales",
      "Pain points clearly articulated"
    ],
    recommendedAction: {
      text: "Schedule demo with full team by end of week",
      confidence: 95,
      historicalSuccess: "Deals with VP engagement in discovery move to demo 90% of the time"
    },
    lastActivity: "Today",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 40,
      totalSteps: 5,
      nextStep: "Schedule demo"
    }
  },
  {
    id: 8,
    company: "HealthTech Medical",
    product: "Enterprise Plan",
    value: 67000,
    stage: "Demo",
    daysInStage: 9,
    rep: { id: 2, name: "John Smith", avatar: "JS" },
    riskScore: 51,
    riskLevel: "medium",
    riskTrend: "up",
    riskScoreChange: 2,
    scoreChangeReason: "New stakeholder (Compliance Officer) introduced, adding complexity.",
    rootCauses: [
      "HIPAA compliance questions raised",
      "Need to involve compliance officer"
    ],
    recommendedAction: {
      text: "Share HIPAA compliance documentation + schedule compliance walkthrough",
      confidence: 88,
      historicalSuccess: "Proactively sharing compliance docs speeds up HealthTech deals by 20%"
    },
    lastActivity: "1 day ago",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 60,
      totalSteps: 5,
      nextStep: "Get compliance sign-off"
    }
  },
  {
    id: 9,
    company: "MarketPro Analytics",
    product: "Growth Package",
    value: 38000,
    stage: "Negotiation",
    daysInStage: 11,
    rep: { id: 7, name: "Rachel Kim", avatar: "RK" },
    riskScore: 55,
    riskLevel: "medium",
    riskTrend: "stable",
    riskScoreChange: 0,
    scoreChangeReason: "Discount request is holding up the deal.",
    rootCauses: [
      "Requesting 20% discount (outside authority)",
      "Comparing with 2 other vendors"
    ],
    recommendedAction: {
      text: "Offer extended payment terms instead of discount - share value calculator",
      confidence: 70,
      historicalSuccess: "Offering flexible terms over discounts wins 65% of contested deals"
    },
    lastActivity: "2 days ago",
    competitor: "Pipedrive",
    hasChampion: true,
    playbook: {
      completion: 75,
      totalSteps: 5,
      nextStep: "Agree on final price"
    }
  },
  {
    id: 10,
    company: "BuildRight Construction",
    product: "Professional Plan",
    value: 29000,
    stage: "Discovery",
    daysInStage: 14,
    rep: { id: 8, name: "Tom Wilson", avatar: "TW" },
    riskScore: 81,
    riskLevel: "high",
    riskTrend: "up",
    riskScoreChange: 12,
    scoreChangeReason: "Champion left the company.",
    rootCauses: [
      "No contact from decision maker in 10 days",
      "Champion left company last week",
      "Budget cycle unclear"
    ],
    recommendedAction: {
      text: "URGENT: Find new champion or mark as lost - send breakup email",
      confidence: 90,
      historicalSuccess: "Breakup emails re-engage 30% of unresponsive leads"
    },
    lastActivity: "10 days ago",
    competitor: null,
    hasChampion: false,
    playbook: {
      completion: 10,
      totalSteps: 5,
      nextStep: "Re-establish contact"
    }
  },
  {
    id: 11,
    company: "EduLearn Platform",
    product: "Enterprise Plus",
    value: 84000,
    stage: "Demo",
    daysInStage: 7,
    rep: { id: 3, name: "Mike Davis", avatar: "MD" },
    riskScore: 47,
    riskLevel: "low",
    riskTrend: "down",
    riskScoreChange: -9,
    scoreChangeReason: "Positive demo feedback and pricing request received.",
    rootCauses: [
      "Strong technical fit confirmed",
      "Demo went well - requested pricing"
    ],
    recommendedAction: {
      text: "Send proposal with ROI breakdown - move to negotiation",
      confidence: 97,
      historicalSuccess: "Sending proposal within 24hrs of demo increases close rate by 15%"
    },
    lastActivity: "Today",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 60,
      totalSteps: 5,
      nextStep: "Send proposal"
    }
  },
  {
    id: 12,
    company: "AutoDrive Logistics",
    product: "Growth Package",
    value: 44000,
    stage: "Negotiation",
    daysInStage: 19,
    rep: { id: 4, name: "Jessica Chen", avatar: "JC" },
    riskScore: 63,
    riskLevel: "medium",
    riskTrend: "up",
    riskScoreChange: 4,
    scoreChangeReason: "VP is on vacation and contract has not been signed.",
    rootCauses: [
      "Waiting on VP approval (out on vacation)",
      "Contract sent 12 days ago - no signature"
    ],
    recommendedAction: {
      text: "Follow up with champion - ask for interim contact while VP is away",
      confidence: 82,
      historicalSuccess: "Engaging champion during delays prevents 60% of stalled deals from being lost"
    },
    lastActivity: "4 days ago",
    competitor: null,
    hasChampion: true,
    playbook: {
      completion: 85,
      totalSteps: 5,
      nextStep: "Get contract signature"
    }
  }
];

export const REPS: Rep[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    title: "Senior Account Executive",
    email: "sarah.johnson@zime.com",
    phone: "+1 (555) 234-5678",
    adoption: 92,
    score: 8.5,
    winRate: 35,
    avgDealSize: 52000,
    activeDeals: 8,
    rank: 2,
    trends: {
      adoption: "up",
      score: "down",
      winRate: "down"
    },
    strengths: [
      "Excellent discovery skills",
      "Strong relationship building",
      "Technical product knowledge"
    ],
    improvements: [
      "Budget qualification (skipped in 60% of calls)",
      "Multi-threading (engages 1.2 stakeholders vs 2.4 team avg)",
      "Objection handling timing"
    ],
    recentCalls: [
      { id: 1, date: "Oct 16, 2025", company: "Acme Corp", score: 85, duration: 42, sentiment: "positive" },
      { id: 5, date: "Oct 15, 2025", company: "CloudScale Labs", score: 72, duration: 38, sentiment: "neutral" }
    ]
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "JS",
    title: "Account Executive",
    email: "john.smith@zime.com",
    phone: "+1 (555) 345-6789",
    adoption: 88,
    score: 8.8,
    winRate: 42,
    avgDealSize: 48000,
    activeDeals: 6,
    rank: 1,
    trends: {
      adoption: "up",
      score: "up",
      winRate: "up"
    },
    strengths: [
      "Consistent budget qualification",
      "Strong closing techniques",
      "Multi-threading expert (3.1 stakeholders avg)"
    ],
    improvements: [
      "Discovery depth (misses technical requirements)",
      "Follow-up timing"
    ]
  },
  {
    id: 3,
    name: "Mike Davis",
    avatar: "MD",
    title: "Senior Account Executive",
    email: "mike.davis@zime.com",
    phone: "+1 (555) 456-7890",
    adoption: 85,
    score: 8.2,
    winRate: 38,
    avgDealSize: 61000,
    activeDeals: 5,
    rank: 3,
    trends: {
      adoption: "stable",
      score: "up",
      winRate: "stable"
    },
    strengths: [
      "Enterprise deal expertise",
      "Negotiation skills",
      "Executive presence"
    ],
    improvements: [
      "Speed to demo (avg 16 days vs 9 team avg)",
      "Case study usage"
    ]
  },
  {
    id: 4,
    name: "Jessica Chen",
    avatar: "JC",
    title: "Account Executive",
    email: "jessica.chen@zime.com",
    phone: "+1 (555) 567-8901",
    adoption: 79,
    score: 7.8,
    winRate: 33,
    avgDealSize: 39000,
    activeDeals: 7,
    rank: 4,
    trends: {
      adoption: "down",
      score: "stable",
      winRate: "down"
    },
    strengths: [
      "Strong demo delivery",
      "Product knowledge"
    ],
    improvements: [
      "Discovery qualification",
      "Competitor positioning",
      "Urgency creation"
    ]
  },
  {
    id: 5,
    name: "David Martinez",
    avatar: "DM",
    title: "Account Executive",
    email: "david.martinez@zime.com",
    phone: "+1 (555) 678-9012",
    adoption: 74,
    score: 7.5,
    winRate: 28,
    avgDealSize: 41000,
    activeDeals: 4,
    rank: 6,
    trends: {
      adoption: "down",
      score: "down",
      winRate: "down"
    },
    strengths: [
      "Persistence",
      "Territory knowledge"
    ],
    improvements: [
      "Needs coaching on entire playbook",
      "Low adoption of AI recommendations",
      "Inconsistent follow-up"
    ]
  },
  {
    id: 6,
    name: "Emily Park",
    avatar: "EP",
    title: "Account Executive",
    email: "emily.park@zime.com",
    phone: "+1 (555) 789-0123",
    adoption: 91,
    score: 8.4,
    winRate: 40,
    avgDealSize: 45000,
    activeDeals: 6,
    rank: 3,
    trends: {
      adoption: "up",
      score: "up",
      winRate: "up"
    },
    strengths: [
      "High playbook adoption",
      "Consistent execution",
      "Champion identification"
    ],
    improvements: [
      "Enterprise deals (avg size $45K vs $58K team avg)"
    ]
  },
  {
    id: 7,
    name: "Rachel Kim",
    avatar: "RK",
    title: "Senior Account Executive",
    email: "rachel.kim@zime.com",
    phone: "+1 (555) 890-1234",
    adoption: 82,
    score: 8.0,
    winRate: 36,
    avgDealSize: 52000,
    activeDeals: 5,
    rank: 5,
    trends: {
      adoption: "stable",
      score: "stable",
      winRate: "up"
    },
    strengths: [
      "ROI articulation",
      "Objection handling"
    ],
    improvements: [
      "Discovery pacing",
      "Technical stakeholder engagement"
    ]
  },
  {
    id: 8,
    name: "Tom Wilson",
    avatar: "TW",
    title: "Account Executive",
    email: "tom.wilson@zime.com",
    phone: "+1 (555) 901-2345",
    adoption: 68,
    score: 7.1,
    winRate: 25,
    avgDealSize: 34000,
    activeDeals: 3,
    rank: 8,
    trends: {
      adoption: "down",
      score: "down",
      winRate: "down"
    },
    strengths: [
      "Activity volume"
    ],
    improvements: [
      "Qualification rigor (churns deals)",
      "Playbook adoption critically low",
      "Needs immediate coaching intervention"
    ]
  }
];

export const CALL_TRANSCRIPT: CallTranscriptItem[] = [
  { time: "00:02", speaker: "Sarah", text: "Hi John, thanks for taking the time today. I really appreciate you making space in your schedule.", tags: [] },
  { time: "00:15", speaker: "John", text: "No problem at all. I'm looking forward to learning more about your solution.", tags: [] },
  { time: "00:18", speaker: "Sarah", text: "We're currently using Stripe for payments, but we're having some integration challenges with our legacy systems.", tags: ["pain-point"] },
  { time: "15:30", speaker: "Sarah", text: "That makes sense. I've worked with several companies transitioning from Stripe. Can you tell me more about the specific integration issues you're facing?", tags: ["discovery-question"] },
  { time: "28:30", speaker: "John", text: "Pricing is a concern for us. We need to make sure this fits within our Q1 budget.", tags: ["objection", "budget-signal"] },
  { time: "28:45", speaker: "Sarah", text: "I understand. Let me show you how our pricing compares and the ROI you can expect in the first quarter.", tags: ["objection-response"] },
  { time: "35:20", speaker: "Sarah", text: "This looks promising. I'd like to involve our CFO in the next conversation.", tags: ["buying-signal"] },
  { time: "35:30", speaker: "John", text: "That sounds great. I'll send over a calendar invite for next week. Looking forward to continuing the conversation.", tags: [] },
  { time: "42:15", speaker: "Sarah", text: "That sounds great. I'll send over a calendar invite for next week. Looking forward to continuing the conversation.", tags: ["next-step"] }
];


export const PLAYBOOK_ACTIONS: Record<string, PlaybookAction[]> = {
  discovery: [
    { action: "Ask about current pain point", completion: 88, impact: 12 },
    { action: "Identify decision-makers", completion: 72, impact: 8 },
    { action: "Ask about budget", completion: 54, impact: 18 },
    { action: "Ask about timeline", completion: 67, impact: 7 },
    { action: "Identify champion", completion: 81, impact: 15 },
    { action: "Discuss competitors", completion: 59, impact: 6 },
    { action: "Share relevant case study", completion: 76, impact: 9 },
    { action: "Multi-thread (2+ stakeholders)", completion: 48, impact: 14 },
    { action: "Set clear next steps", completion: 91, impact: 5 },
  ],
  demo: [
    { action: "Customize demo to pain points", completion: 85, impact: 10 },
    { action: "Involve technical stakeholder", completion: 62, impact: 12 },
    { action: "Show ROI calculator", completion: 71, impact: 11 },
    { action: "Address objections live", completion: 73, impact: 9 },
    { action: "Share customer testimonial", completion: 68, impact: 7 },
    { action: "Confirm budget range", completion: 55, impact: 13 },
    { action: "Schedule decision-maker follow-up", completion: 79, impact: 8 },
  ],
  negotiation: [
    { action: "Present pricing with options", completion: 91, impact: 7 },
    { action: "Share detailed ROI breakdown", completion: 69, impact: 9 },
    { action: "Confirm timeline and urgency", completion: 78, impact: 6 },
    { action: "Address legal/security concerns", completion: 84, impact: 5 },
    { action: "Involve executive sponsor", completion: 63, impact: 11 },
    { action: "Set firm close date", completion: 72, impact: 10 },
  ],
};
