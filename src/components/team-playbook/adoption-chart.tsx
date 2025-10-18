"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { week: 'W1', adoption: 65 }, { week: 'W2', adoption: 68 },
  { week: 'W3', adoption: 72 }, { week: 'W4', adoption: 70 },
  { week: 'W5', adoption: 75 }, { week: 'W6', adoption: 78 },
  { week: 'W7', adoption: 82 }, { week: 'W8', adoption: 81 },
  { week: 'W9', adoption: 85 }, { week: 'W10', adoption: 88 },
  { week: 'W11', adoption: 87 }, { week: 'W12', adoption: 90 },
];

export function AdoptionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Playbook Adoption Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
            <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis unit="%" tick={{ fill: '#6B7280', fontSize: 12 }} domain={[60, 100]} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(5px)',
                borderRadius: '0.5rem',
                border: '1px solid #E5E7EB'
              }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="adoption" stroke="#3B82F6" strokeWidth={2} fill="url(#colorAdoption)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
