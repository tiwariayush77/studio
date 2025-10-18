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
  TrendingUp
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

const lossReasonData = [
    { name: 'Price', value: 28, fill: '#3B82F6' },
    { name: 'No budget', value: 22, fill: '#8B5CF6' },
    { name: 'Went with competitor', value: 18, fill: '#F59E0B' },
    { name: 'Timing', value: 15, fill: '#6B7280' },
    { name: 'Other', value: 17, fill: '#EC4899' },
];

const winLossColors = ['#10B981', '#EF4444'];


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
  conversion: number | null;
  stageColor: string;
}> = ({ stage, deals, value, conversion, stageColor }) => (
    <div className={cn("bg-gradient-to-r border-l-4 rounded-lg p-5 hover:shadow-md transition-all", stageColor)}>
        <div className="flex items-center justify-between">
            <div>
                <p className={cn("text-xs font-medium uppercase tracking-wide mb-1", 
                    stage === "Discovery" ? "text-blue-600" :
                    stage === "Demo" ? "text-emerald-600" :
                    stage === "Negotiation" ? "text-amber-600" : "text-indigo-600"
                )}>
                    {stage}
                </p>
                <p className={cn("text-3xl font-bold",
                    stage === "Discovery" ? "text-blue-900" :
                    stage === "Demo" ? "text-emerald-900" :
                    stage === "Negotiation" ? "text-amber-900" : "text-indigo-900"
                )}>
                    {deals} deals
                </p>
                <p className={cn("text-sm mt-1",
                    stage === "Discovery" ? "text-blue-700" :
                    stage === "Demo" ? "text-emerald-700" :
                    stage === "Negotiation" ? "text-amber-700" : "text-indigo-700"
                )}>
                    {value}
                </p>
            </div>
            {conversion !== null ? (
                <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Conversion</p>
                    <p className="text-2xl font-bold text-gray-900">{conversion}%</p>
                    <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                        <div className={cn("h-2 rounded-full", 
                            stage === "Discovery" ? "bg-blue-500" :
                            stage === "Demo" ? "bg-emerald-500" : "bg-amber-500"
                        )} style={{width: `${conversion}%`}}></div>
                    </div>
                </div>
            ) : (
                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Win Rate: 36%
                </span>
            )}
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
        <Card className="p-4 shadow-sm border border-gray-200">
            <CardHeader className="p-0">
                <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-2xl font-bold text-gray-900 mt-2">$691K</p>
                <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">+12.5%</span>
                    <span className="text-xs text-gray-500">vs last period</span>
                </div>
            </CardContent>
        </Card>
        <Card className="p-4 shadow-sm border border-gray-200">
            <CardHeader className="p-0">
                <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">Average Deal Size</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-2xl font-bold text-gray-900 mt-2">$48K</p>
                <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">+3.2%</span>
                     <span className="text-xs text-gray-500">vs last period</span>
                </div>
            </CardContent>
        </Card>
        <Card className="p-4 shadow-sm border border-gray-200">
            <CardHeader className="p-0">
                <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">Win Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-2xl font-bold text-gray-900 mt-2">36%</p>
                <div className="flex items-center gap-1 mt-2">
                    <ArrowDown className="w-3 h-3 text-red-600" />
                    <span className="text-xs font-medium text-red-600">-2.1%</span>
                     <span className="text-xs text-gray-500">vs last period</span>
                </div>
            </CardContent>
        </Card>
        <Card className="p-4 shadow-sm border border-gray-200">
            <CardHeader className="p-0">
                <CardTitle className="text-xs font-medium text-gray-600 uppercase tracking-wide">Average Sales Cycle</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-2xl font-bold text-gray-900 mt-2">42 days</p>
                <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-3 h-3 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-600">+5 days</span>
                     <span className="text-xs text-gray-500">vs last period</span>
                </div>
            </CardContent>
        </Card>
      </div>

        <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pipeline Velocity Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={velocityData}>
                <defs>
                  <linearGradient id="colorDiscovery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '13px' }}/>
                <Line
                  type="monotone"
                  dataKey="discovery"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={{ fill: '#3B82F6', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Discovery"
                />
                <Line
                  type="monotone"
                  dataKey="demo"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ fill: '#10B981', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Demo"
                />
                <Line
                  type="monotone"
                  dataKey="negotiation"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  dot={{ fill: '#F59E0B', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Negotiation"
                />
            </LineChart>
            </ResponsiveContainer>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Stage Funnel</h3>
                <div className="space-y-3">
                    <FunnelStage stage="Discovery" deals={45} value="$820K pipeline" conversion={62} stageColor="from-blue-50 to-blue-100 border-blue-500" />
                    <FunnelStage stage="Demo" deals={28} value="$640K pipeline" conversion={54} stageColor="from-emerald-50 to-emerald-100 border-emerald-500" />
                    <FunnelStage stage="Negotiation" deals={15} value="$580K pipeline" conversion={80} stageColor="from-amber-50 to-amber-100 border-amber-500" />
                    <FunnelStage stage="Closed Won" deals={12} value="$420K won" conversion={null} stageColor="from-indigo-50 to-indigo-100 border-indigo-500" />
                </div>
            </Card>
            <Card className="p-6">
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Analysis</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={winLossData} dataKey="value" nameKey="name" cx="50%" cy="40%" outerRadius={60} label>
                            {winLossData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={winLossColors[index % winLossColors.length]} />
                            ))}
                        </Pie>
                        <Pie data={lossReasonData} dataKey="value" nameKey="name" cx="50%" cy="40%" innerRadius={70} outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
                             {lossReasonData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
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
                <BarChart data={repPerformanceData.sort((a,b) => b[repSortMetric as keyof typeof a] - a[repSortMetric as keyof typeof a])}>
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
