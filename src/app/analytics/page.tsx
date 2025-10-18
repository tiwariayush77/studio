'use client';

import { useState, useEffect } from 'react';
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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Download,
  FileText as FileTextIcon,
  Image as ImageIcon,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REPS } from '@/lib/data';

// --- Helper Functions for Data Generation ---

function generateVelocityData(days: number) {
  const weeks = Math.ceil(days / 7);
  return Array.from({ length: weeks }, (_, i) => ({
    label: `Week ${i + 1}`,
    discovery: Math.floor(Math.random() * 20) + 10,
    demo: Math.floor(Math.random() * 15) + 8,
    negotiation: Math.floor(Math.random() * 10) + 5,
  }));
}

function generateWinRateData(days: number) {
    const weeks = Math.ceil(days / 7);
    return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        winRate: Math.floor(Math.random() * 20) + 30, // 30-50%
    }));
}

function generateDealSizeData(days: number) {
    const weeks = Math.ceil(days / 7);
    return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        avgDealSize: Math.floor(Math.random() * 20000) + 40000,
    }));
}

function generateSalesCycleData(days: number) {
    const weeks = Math.ceil(days / 7);
    return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        salesCycle: Math.floor(Math.random() * 15) + 35,
    }));
}

function generateConversionData() {
    return [
        { label: 'Discovery > Demo', value: 62 },
        { label: 'Demo > Negotiation', value: 54 },
        { label: 'Negotiation > Closed', value: 80 },
    ];
}

function generateRepData(repFilter: string) {
  let reps = [...REPS];
  if (repFilter === 'top-5') {
    reps = reps.sort((a, b) => b.winRate - a.winRate).slice(0, 5);
  } else if (repFilter === 'bottom-5') {
    reps = reps.sort((a, b) => a.winRate - b.winRate).slice(0, 5);
  }
  return reps.map(rep => ({
    label: rep.name,
    winRate: rep.winRate,
    adoption: rep.adoption,
    avgDealSize: rep.avgDealSize / 1000,
  }));
}


const getChartData = (metric: string, timeframe: string, rep: string) => {
    const periods: { [key: string]: number } = {
        '7-days': 7,
        '30-days': 30,
        '90-days': 90,
        '1-year': 365,
    };
    const days = periods[timeframe] || 30;

    switch (metric) {
        case 'pipeline-velocity': return generateVelocityData(days);
        case 'win-rate-trend': return generateWinRateData(days);
        case 'deal-size-avg': return generateDealSizeData(days);
        case 'sales-cycle': return generateSalesCycleData(days);
        case 'stage-conversion': return generateConversionData();
        case 'rep-performance': return generateRepData(rep);
        default: return [];
    }
};

const getMetricTitle = (metric: string, timeframe: string) => {
    const titles: { [key: string]: string } = {
        'pipeline-velocity': 'Pipeline Velocity',
        'win-rate-trend': 'Win Rate Trend',
        'deal-size-avg': 'Average Deal Size',
        'sales-cycle': 'Sales Cycle Length',
        'stage-conversion': 'Stage Conversion Rates',
        'rep-performance': 'Rep Performance Comparison',
    };
     const periods: { [key: string]: string } = {
        '7-days': 'Last 7 Days',
        '30-days': 'Last 30 Days',
        '90-days': 'Last Quarter',
        '1-year': 'Last Year',
    };
    return `${titles[metric]} - ${periods[timeframe]}`;
};

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

// --- Components ---

const MetricCard = ({ title, value, trend, isPositive }: { title: string; value: string; trend: string; isPositive: boolean; }) => (
    <Card className="p-4 shadow-sm border border-gray-200">
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        <div className="flex items-center gap-1 mt-2">
            {isPositive ? <TrendingUp className="w-3 h-3 text-green-600" /> : <TrendingDown className="w-3 h-3 text-red-600" />}
            <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
        </div>
    </Card>
);

const lossReasons = [
    { name: 'Price', value: 28, color: '#EF4444' },
    { name: 'No budget', value: 22, color: '#F97316' },
    { name: 'Competitor', value: 18, color: '#F59E0B' },
    { name: 'Timing', value: 15, color: '#84CC16' },
    { name: 'Other', value: 17, color: '#A855F7' },
];


const AnalyticsPage = () => {
    const [selectedMetric, setSelectedMetric] = useState('pipeline-velocity');
    const [chartType, setChartType] = useState('line');
    const [timeframe, setTimeframe] = useState('30-days');
    const [selectedRep, setSelectedRep] = useState('all');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const data = getChartData(selectedMetric, timeframe, selectedRep);
        setChartData(data);
    }, [selectedMetric, timeframe, selectedRep]);
    
    const handleExport = (format: 'csv' | 'pdf' | 'png') => {
        alert(`Exporting chart as ${format}...`);
    };

    const renderDynamicChart = (type: string, data: any[]) => {
      if (!data || data.length === 0) return <div className="flex items-center justify-center h-full text-gray-500">No data available for this selection.</div>;

      const commonProps = {
        data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 },
      };
      const commonElements = (
        <>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="label" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
          <Legend />
        </>
      );

      switch (type) {
        case 'line':
          return (
            <LineChart {...commonProps}>
              {commonElements}
              {Object.keys(data[0] || {}).filter(key => key !== 'label').map((key, i) => (
                <Line key={key} type="monotone" dataKey={key} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2.5} dot={{ r: 4 }} />
              ))}
            </LineChart>
          );
        case 'bar':
          return (
            <BarChart {...commonProps}>
              {commonElements}
              {Object.keys(data[0] || {}).filter(key => key !== 'label').map((key, i) => (
                <Bar key={key} dataKey={key} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </BarChart>
          );
        case 'area':
          return (
            <AreaChart {...commonProps}>
              {commonElements}
              {Object.keys(data[0] || {}).filter(key => key !== 'label').map((key, i) => (
                <Area key={key} type="monotone" dataKey={key} stroke={CHART_COLORS[i % CHART_COLORS.length]} fill={CHART_COLORS[i % CHART_COLORS.length]} fillOpacity={0.3} />
              ))}
            </AreaChart>
          );
        default: return <LineChart {...commonProps}>{commonElements}<Line type="monotone" dataKey="value" stroke={CHART_COLORS[0]} /></LineChart>;
      }
    };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <p className="text-base text-gray-600 mt-2">Performance insights and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Total Pipeline" value="$691K" trend="+12.5%" isPositive={true} />
        <MetricCard title="Average Deal Size" value="$48K" trend="+3.2%" isPositive={true} />
        <MetricCard title="Win Rate" value="36%" trend="-2.1%" isPositive={false} />
        <MetricCard title="Sales Cycle" value="42 days" trend="+5 days" isPositive={false} />
      </div>
      
       <Card className="mb-6 p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle>Analytics Controls</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Metric</label>
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pipeline-velocity">Pipeline Velocity</SelectItem>
                            <SelectItem value="win-rate-trend">Win Rate Trend</SelectItem>
                            <SelectItem value="deal-size-avg">Average Deal Size</SelectItem>
                            <SelectItem value="sales-cycle">Sales Cycle Length</SelectItem>
                            <SelectItem value="stage-conversion">Stage Conversion Rates</SelectItem>
                            <SelectItem value="rep-performance">Rep Performance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Chart Type</label>
                    <Select value={chartType} onValueChange={setChartType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="line">Line Chart</SelectItem>
                            <SelectItem value="bar">Bar Chart</SelectItem>
                            <SelectItem value="area">Area Chart</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Time Period</label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7-days">Last 7 Days</SelectItem>
                            <SelectItem value="30-days">Last 30 Days</SelectItem>
                            <SelectItem value="90-days">Last Quarter</SelectItem>
                            <SelectItem value="1-year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {selectedMetric === 'rep-performance' && (
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Compare Reps</label>
                        <Select value={selectedRep} onValueChange={setSelectedRep}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Reps</SelectItem>
                                <SelectItem value="top-5">Top 5 Performers</SelectItem>
                                <SelectItem value="bottom-5">Bottom 5 Performers</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
             <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">
                <Button size="sm" variant="outline" onClick={() => handleExport('csv')}><Download className="w-4 h-4 mr-2" />Export CSV</Button>
                <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}><FileTextIcon className="w-4 h-4 mr-2" />Export PDF</Button>
                <Button size="sm" variant="outline" onClick={() => handleExport('png')}><ImageIcon className="w-4 h-4 mr-2" />Save as Image</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6 p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle>{getMetricTitle(selectedMetric, timeframe)}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                {renderDynamicChart(chartType, chartData)}
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
            <CardHeader className="p-0 mb-4">
                <CardTitle>Deal Stage Funnel</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-blue-600 uppercase mb-1">Discovery</p><p className="text-2xl font-bold text-blue-900">45 deals</p><p className="text-sm text-blue-700 mt-1">$820K</p></div><div className="text-right"><p className="text-xs text-gray-600 mb-1">Conversion</p><p className="text-xl font-bold text-gray-900">62%</p></div></div></div>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-500 rounded-lg p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-emerald-600 uppercase mb-1">Demo</p><p className="text-2xl font-bold text-emerald-900">28 deals</p><p className="text-sm text-emerald-700 mt-1">$640K</p></div><div className="text-right"><p className="text-xs text-gray-600 mb-1">Conversion</p><p className="text-xl font-bold text-gray-900">54%</p></div></div></div>
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-lg p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-amber-600 uppercase mb-1">Negotiation</p><p className="text-2xl font-bold text-amber-900">15 deals</p><p className="text-sm text-amber-700 mt-1">$580K</p></div><div className="text-right"><p className="text-xs text-gray-600 mb-1">Conversion</p><p className="text-xl font-bold text-gray-900">80%</p></div></div></div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 rounded-lg p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-indigo-600 uppercase mb-1">Closed Won</p><p className="text-2xl font-bold text-indigo-900">12 deals</p><p className="text-sm text-indigo-700 mt-1">$420K</p></div><div className="text-right"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Win Rate: 36%</span></div></div></div>
            </CardContent>
        </Card>
        <Card className="p-6">
            <CardHeader className="p-0 mb-4">
                <CardTitle>Win/Loss Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={[{ name: 'Won', value: 36 }, { name: 'Lost', value: 64 }]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                            <Cell fill="#10B981" />
                            <Cell fill="#EF4444" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Loss Reasons:</h4>
                    <div className="space-y-2">
                        {lossReasons.map(reason => (
                            <div key={reason.name} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{reason.name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full"><div className="h-2 bg-red-500 rounded-full" style={{ width: `${reason.value}%` }}></div></div>
                                    <span className="text-sm font-medium text-gray-900 w-10 text-right">{reason.value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default AnalyticsPage;
