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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  Download,
  FileText as FileTextIcon,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { REPS } from '@/lib/data';

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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const getChartData = (metric: string, timeframe: string, rep: string) => {
    // This is mock data generation logic.
    // In a real app, you would fetch and process data based on the parameters.
    if (metric.includes('rep-performance')) {
        let reps = REPS;
        if (rep === 'top-5') {
            reps = REPS.sort((a, b) => b.winRate - a.winRate).slice(0, 5);
        } else if (rep === 'bottom-5') {
            reps = REPS.sort((a, b) => a.winRate - b.winRate).slice(0, 5);
        }
        return reps.map(r => ({ label: r.name, value: r.winRate }));
    }
    return velocityData.map(d => ({ label: d.week, value: d.discovery }));
};

const getMetricTitle = (metric: string) => {
    const titles: { [key: string]: string } = {
        'pipeline-velocity': 'Pipeline Velocity',
        'win-rate-trend': 'Win Rate Trend',
        'deal-size-avg': 'Average Deal Size',
        'sales-cycle': 'Sales Cycle Length',
        'stage-conversion': 'Stage Conversion Rates',
        'rep-performance': 'Rep Performance Comparison',
        'risk-trends': 'Risk Trends',
        'revenue-forecast': 'Revenue Forecast',
    };
    return titles[metric] || 'Analytics';
};

const AnalyticsPage = () => {
    const [selectedMetric, setSelectedMetric] = useState('pipeline-velocity');
    const [chartType, setChartType] = useState('line');
    const [timeframe, setTimeframe] = useState('30-days');
    const [selectedRep, setSelectedRep] = useState('all');
    
    const handleExport = (format: 'csv' | 'pdf' | 'png') => {
        alert(`Exporting chart as ${format}...`);
        // In a real app, you'd implement the export logic here
        // using libraries like html2canvas, jspdf, or a CSV generator.
    };

    const renderChart = () => {
        const data = getChartData(selectedMetric, timeframe, selectedRep);

        switch (chartType) {
            case 'line':
                return <LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} /></LineChart>;
            case 'bar':
                return <BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis /><Tooltip /><Legend /><Bar dataKey="value" fill="#3B82F6" /></BarChart>;
            case 'area':
                return <AreaChart data={data}><defs><linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis /><Tooltip /><Legend /><Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorValue)" /></AreaChart>;
            case 'pie':
                return <PieChart><Pie data={data} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={120} label>{data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart>;
            default:
                return <LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="label" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} /></LineChart>;
        }
    };


  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <p className="text-base text-gray-600 mt-2">
          Performance insights and trends
        </p>
      </div>

       <Card className="mt-6 p-6">
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
                            <SelectItem value="risk-trends">Risk Trends</SelectItem>
                            <SelectItem value="revenue-forecast">Revenue Forecast</SelectItem>
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
                            <SelectItem value="pie">Pie Chart</SelectItem>
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
                            <SelectItem value="ytd">Year to Date</SelectItem>
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
                                {REPS.map(rep => (
                                    <SelectItem key={rep.id} value={rep.id.toString()}>{rep.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
             <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <Button size="sm" variant="outline" onClick={() => handleExport('csv')}><Download className="w-4 h-4 mr-2" />Export CSV</Button>
                <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}><FileTextIcon className="w-4 h-4 mr-2" />Export PDF</Button>
                <Button size="sm" variant="outline" onClick={() => handleExport('png')}><ImageIcon className="w-4 h-4 mr-2" />Save as Image</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6 p-6">
        <CardHeader className="p-0 mb-4">
            <CardTitle>{getMetricTitle(selectedMetric)}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
            </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  );
};

export default AnalyticsPage;
