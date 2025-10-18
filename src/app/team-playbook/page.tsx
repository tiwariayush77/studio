"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, BarChart, Bar, Legend } from 'recharts';
import { Download, FileText as FileTextIcon, Image as ImageIcon } from 'lucide-react';

const getPlaybookChartData = (metric: string, timeframe: string) => {
    const weeks = timeframe === '7-days' ? 1 : timeframe === '30-days' ? 4 : 12;
    return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        adoption: 70 + Math.floor(Math.random() * 20),
        winRateImpact: Math.floor(Math.random() * 5) + 10,
    }));
};

const getPlaybookMetricTitle = (metric: string, timeframe: string) => {
    const titles: { [key: string]: string } = {
        'overall': 'Overall Playbook Adoption',
        'discovery': 'Discovery Stage Adoption',
        'demo': 'Demo Stage Adoption',
        'negotiation': 'Negotiation Stage Adoption',
        'win-rate-impact': 'Win Rate Impact',
    };
    const periods: { [key: string]: string } = {
        '7-days': 'Last 7 Days',
        '30-days': 'Last 30 Days',
        '90-days': 'Last Quarter',
    };
    return `${titles[metric]} - ${periods[timeframe]}`;
};

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function TeamPlaybookPage() {
    const [selectedMetric, setSelectedMetric] = useState("overall");
    const [chartType, setChartType] = useState('line');
    const [timeframe, setTimeframe] = useState('30-days');
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        setChartData(getPlaybookChartData(selectedMetric, timeframe));
    }, [selectedMetric, timeframe]);

    const handleExport = (format: 'csv' | 'pdf' | 'png') => {
        alert(`Exporting playbook data as ${format}...`);
    };

    const renderDynamicChart = (type: string, data: any[]) => {
        if (!data || data.length === 0) return null;
        
        const metricKey = selectedMetric === 'win-rate-impact' ? 'winRateImpact' : 'adoption';

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
                return <LineChart {...commonProps}>{commonElements}<Line type="monotone" dataKey={metricKey} stroke={CHART_COLORS[0]} strokeWidth={2.5} dot={{ r: 4 }} /></LineChart>;
            case 'bar':
                return <BarChart {...commonProps}>{commonElements}<Bar dataKey={metricKey} fill={CHART_COLORS[0]} /></BarChart>;
            case 'area':
                return <AreaChart {...commonProps}>{commonElements}<Area type="monotone" dataKey={metricKey} stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.3} /></AreaChart>;
            default:
                return <LineChart {...commonProps}>{commonElements}<Line type="monotone" dataKey={metricKey} stroke={CHART_COLORS[0]} /></LineChart>;
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Team Playbook Adoption Tracker</h1>
                <p className="text-base text-gray-600 mt-2">Track which sales actions drive wins</p>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Playbook Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Metric</label>
                        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="overall">Overall Adoption</SelectItem>
                                <SelectItem value="discovery">Discovery Stage</SelectItem>
                                <SelectItem value="demo">Demo Stage</SelectItem>
                                <SelectItem value="negotiation">Negotiation Stage</SelectItem>
                                <SelectItem value="win-rate-impact">Win Rate Impact</SelectItem>
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
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200">
                    <Button size="sm" variant="outline" onClick={() => handleExport('csv')}><Download className="w-3 h-3 mr-2" />Export Data</Button>
                    <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}><FileTextIcon className="w-3 h-3 mr-2" />Export Report</Button>
                    <Button size="sm" variant="outline" onClick={() => handleExport('png')}><ImageIcon className="w-3 h-3 mr-2" />Save Chart</Button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {getPlaybookMetricTitle(selectedMetric, timeframe)}
                </h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {renderDynamicChart(chartType, chartData)}
                    </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <PlaybookBreakdown />
            
            <CoachingPriorities />
        </div>
    );
}
