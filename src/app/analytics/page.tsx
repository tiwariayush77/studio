'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import {
  ArrowDown,
  ArrowUp,
  TrendingUp,
  FileText,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { FC } from 'react';

const velocityData = [
  { week: 'W1', discovery: 45, demo: 25, negotiation: 10 },
  { week: 'W2', discovery: 48, demo: 28, negotiation: 12 },
  { week: 'W3', discovery: 52, demo: 31, negotiation: 15 },
  { week: 'W4', discovery: 50, demo: 30, negotiation: 14 },
  { week: 'W5', discovery: 55, demo: 33, negotiation: 17 },
  { week: 'W6', discovery: 58, demo: 36, negotiation: 19 },
  { week: 'W7', discovery: 62, demo: 39, negotiation: 21 },
  { week: 'W8', discovery: 61, demo: 38, negotiation: 20 },
  { week: 'W9', discovery: 65, demo: 42, negotiation: 23 },
  { week: 'W10', discovery: 68, demo: 45, negotiation: 25 },
  { week: 'W11', discovery: 67, demo: 44, negotiation: 24 },
  { week: 'W12', discovery: 70, demo: 47, negotiation: 26 },
];

const winLossData = [
  { name: 'Won', value: 36 },
  { name: 'Lost', value: 64 },
];
const winLossColors = ['#10B981', '#EF4444'];

const lossReasonData = [
    { name: 'Price', value: 28, fill: '#3B82F6' },
    { name: 'No budget', value: 22, fill: '#8B5CF6' },
    { name: 'Went with competitor', value: 18, fill: '#F59E0B' },
    { name: 'Timing', value: 15, fill: '#6B7280' },
    { name: 'Other', value: 17, fill: '#10B981' },
];


const repPerformanceData = [
  { name: 'Sarah J.', winRate: 35, avgDealSize: 52, salesCycle: 38 },
  { name: 'John S.', winRate: 42, avgDealSize: 48, salesCycle: 32 },
  { name: 'Mike D.', winRate: 38, avgDealSize: 61, salesCycle: 45 },
  { name: 'Jessica C.', winRate: 33, avgDealSize: 39, salesCycle: 41 },
  { name: 'David M.', winRate: 28, avgDealSize: 41, salesCycle: 52 },
  { name: 'Emily P.', winRate: 40, avgDealSize: 45, salesCycle: 35 },
];

const FunnelStage: FC<{
  stage: string;
  deals: number;
  value: string;
  color: string;
  conversion?: number;
  isFirst?: boolean;
}> = ({ stage, deals, value, color, conversion, isFirst = false }) => (
    <div className="relative pl-8">
        {!isFirst && (
            <div className="absolute left-4 top-[-24px] h-6 w-px bg-gray-300"></div>
        )}
        <div className={cn("p-4 rounded-lg", color)}>
            <div className="flex justify-between items-center">
                <span className="font-semibold text-white">{stage}</span>
                {!isFirst && conversion && (
                    <span className="text-xs text-white/80">{conversion}% conversion</span>
                )}
            </div>
            <div className="text-2xl font-bold text-white mt-1">{deals} deals</div>
            <div className="text-sm text-white/90">{value}</div>
        </div>
    </div>
);


const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  const [repSortMetric, setRepSortMetric] = useState('winRate');


  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <p className="text-base text-gray-600 mt-2">
          Performance insights and trends
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        {['Last 7 Days', 'Last 30 Days', 'Last Quarter', 'This Year'].map(
          (period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
            <CardHeader>
                <CardTitle className="text-sm text-gray-600 font-medium">Total Pipeline Value</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-900">$691K</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <ArrowUp className="w-4 h-4" />
                    +12.5% vs last period
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm text-gray-600 font-medium">Average Deal Size</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-900">$48K</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <ArrowUp className="w-4 h-4" />
                    +3.2%
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm text-gray-600 font-medium">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-900">36%</p>
                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <ArrowDown className="w-4 h-4" />
                    -2.1%
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-sm text-gray-600 font-medium">Average Sales Cycle</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold text-gray-900">42 days</p>
                <p className="text-sm text-yellow-600 flex items-center gap-1 mt-1">
                    <ArrowUp className="w-4 h-4" />
                    +5 days
                </p>
            </CardContent>
        </Card>
      </div>

        <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pipeline Velocity Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                type="monotone"
                dataKey="discovery"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Discovery"
                />
                <Line
                type="monotone"
                dataKey="demo"
                stroke="#10B981"
                strokeWidth={2}
                name="Demo"
                />
                <Line
                type="monotone"
                dataKey="negotiation"
                stroke="#F59E0B"
                strokeWidth={2}
                name="Negotiation"
                />
            </LineChart>
            </ResponsiveContainer>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Stage Funnel</h3>
                <div className="space-y-4">
                    <FunnelStage stage="Discovery" deals={45} value="$820K" color="bg-blue-500" isFirst />
                    <FunnelStage stage="Demo" deals={28} value="$640K" color="bg-green-500" conversion={62} />
                    <FunnelStage stage="Negotiation" deals={15} value="$580K" color="bg-yellow-500" conversion={54} />
                    <FunnelStage stage="Closed Won" deals={12} value="$420K" color="bg-purple-500" conversion={80} />
                </div>
            </Card>
            <Card className="p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Analysis</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={winLossData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                            {winLossData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={winLossColors[index % winLossColors.length]} />
                            ))}
                        </Pie>
                        <Pie data={lossReasonData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
                             {lossReasonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                 </ResponsiveContainer>
            </Card>
        </div>

        <Card className="mt-6 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rep Performance Comparison</h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm">Sort by:</span>
                    <Button size="sm" variant={repSortMetric === 'winRate' ? 'secondary' : 'ghost'} onClick={() => setRepSortMetric('winRate')}>Win Rate</Button>
                    <Button size="sm" variant={repSortMetric === 'avgDealSize' ? 'secondary' : 'ghost'} onClick={() => setRepSortMetric('avgDealSize')}>Deal Size</Button>
                    <Button size="sm" variant={repSortMetric === 'salesCycle' ? 'secondary' : 'ghost'} onClick={() => setRepSortMetric('salesCycle')}>Sales Cycle</Button>
                </div>
            </div>
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={repPerformanceData.sort((a,b) => b[repSortMetric] - a[repSortMetric])}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={repSortMetric} fill="#3B82F6" />
                </BarChart>
            </ResponsiveContainer>
        </Card>

    </div>
  );
};

export default AnalyticsPage;
