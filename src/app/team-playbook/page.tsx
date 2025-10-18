"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdoptionChart } from "@/components/team-playbook/adoption-chart";
import { PlaybookBreakdown } from "@/components/team-playbook/playbook-breakdown";
import { CoachingPriorities } from "@/components/team-playbook/coaching-priorities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';


export default function TeamPlaybookPage() {
    const [activePeriod, setActivePeriod] = useState("30D");
    const [selectedMetric, setSelectedMetric] = useState("overall");
    
    const chartData = [
      { week: 'W1', adoption: 65, winrate: 28, velocity: 45 }, { week: 'W2', adoption: 68, winrate: 29, velocity: 44 },
      { week: 'W3', adoption: 72, winrate: 31, velocity: 42 }, { week: 'W4', adoption: 70, winrate: 30, velocity: 43 },
      { week: 'W5', adoption: 75, winrate: 33, velocity: 40 }, { week: 'W6', adoption: 78, winrate: 34, velocity: 39 },
      { week: 'W7', adoption: 82, winrate: 36, velocity: 38 }, { week: 'W8', adoption: 81, winrate: 35, velocity: 38 },
      { week: 'W9', adoption: 85, winrate: 38, velocity: 36 }, { week: 'W10', adoption: 88, winrate: 40, velocity: 35 },
      { week: 'W11', adoption: 87, winrate: 39, velocity: 35 }, { week: 'W12', adoption: 90, winrate: 42, velocity: 34 },
    ];

    const metricKey = selectedMetric === 'winrate' ? 'winrate' : selectedMetric === 'velocity' ? 'velocity' : 'adoption';


    return (
        <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Team Playbook Adoption Tracker</h1>
                <p className="text-base text-gray-600 mt-2">Track which sales actions drive wins</p>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Playbook Performance Trends</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Metric:</span>
                      <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overall">Overall Adoption</SelectItem>
                          <SelectItem value="discovery">Discovery Stage Adoption</SelectItem>
                          <SelectItem value="demo">Demo Stage Adoption</SelectItem>
                          <SelectItem value="negotiation">Negotiation Stage Adoption</SelectItem>
                          <SelectItem value="winrate">Win Rate Impact</SelectItem>
                          <SelectItem value="velocity">Deal Velocity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Period:</span>
                        <div className="flex gap-1">
                          {['7D', '30D', '90D', 'All'].map(period => (
                            <Button
                              key={period}
                              size="sm"
                              variant={activePeriod === period ? 'default' : 'outline'}
                              onClick={() => setActivePeriod(period)}
                            >
                              {period}
                            </Button>
                          ))}
                        </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                    <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(5px)',
                        borderRadius: '0.5rem',
                        border: '1px solid #E5E7EB'
                      }}
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey={metricKey} stroke="#3B82F6" strokeWidth={2} dot={{r: 4}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <PlaybookBreakdown />
            
            <CoachingPriorities />
        </div>
    );
}
