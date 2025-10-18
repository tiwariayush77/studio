'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Download, FileText, Image as ImageIcon } from 'lucide-react';
import { PLAYBOOK_ACTIONS } from '@/lib/data';
import { cn } from '@/lib/utils';

// ============= DATA GENERATION (KEEP LOGIC) =============

function generatePlaybookData(metric: string, timeframe: string) {
  const periods: Record<string, number> = {
    '7-days': 1,
    '30-days': 4,
    '90-days': 12,
  };
  const weeks = periods[timeframe] || 4;

  const data = [];
  for (let i = 0; i < weeks; i++) {
    data.push({
      name: `Week ${i + 1}`,
      value: Math.floor(Math.random() * 20) + 70, // 70-90% adoption
    });
  }
  return data;
}

// ============= EXPORT FUNCTIONS (KEEP) =============

function handleExportPlaybook(type: 'csv' | 'pdf' | 'image', data: any[]) {
  if (type === 'csv') {
    const csv = convertToCSV(data);
    downloadFile(csv, `playbook-data-${Date.now()}.csv`, 'text/csv');
  } else if (type === 'pdf') {
    alert('PDF export will be implemented with jsPDF library');
  } else if (type === 'image') {
    alert('Image export will be implemented with html2canvas library');
  }
}

function convertToCSV(data: any[]) {
  if (!data || data.length === 0) return '';
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  return [headers, ...rows].join('\n');
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// ============= CHART RENDERING =============
function renderChart(type: string, data: any[]) {
  const commonAxisProps = {
    xAxis: {
      height: 50,
      tick: { fill: '#1F2937', fontSize: 14, fontWeight: 600 },
      tickLine: { stroke: '#1F2937', strokeWidth: 2 },
      axisLine: { stroke: '#1F2937', strokeWidth: 2 },
      stroke: '#1F2937',
    },
    yAxis: {
      width: 50,
      tick: { fill: '#1F2937', fontSize: 14, fontWeight: 600 },
      tickLine: { stroke: '#1F2937', strokeWidth: 2 },
      axisLine: { stroke: '#1F2937', strokeWidth: 2 },
      stroke: '#1F2937',
      label: {
        value: 'Adoption %',
        angle: -90,
        position: 'insideLeft',
        style: { fill: '#1F2937', fontWeight: 600 },
      },
    },
  };

  const commonProps = {
    data,
    margin: { top: 20, right: 40, bottom: 60, left: 60 },
  };

  switch (type) {
    case 'line':
      return (
        <LineChart {...commonProps}>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="#D1D5DB"
            strokeWidth={1}
          />
          <XAxis dataKey="name" {...commonAxisProps.xAxis} />
          <YAxis {...commonAxisProps.yAxis} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '2px solid #3B82F6',
              borderRadius: '8px',
              padding: '12px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Adoption Rate"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{
              fill: '#3B82F6',
              r: 6,
              strokeWidth: 2,
              stroke: 'white',
            }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      );

    case 'bar':
      return (
        <BarChart {...commonProps}>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="#D1D5DB"
            strokeWidth={1}
          />
          <XAxis dataKey="name" {...commonAxisProps.xAxis} />
          <YAxis {...commonAxisProps.yAxis} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Adoption Rate" fill="#3B82F6" />
        </BarChart>
      );

    case 'area':
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="#D1D5DB"
            strokeWidth={1}
          />
          <XAxis dataKey="name" {...commonAxisProps.xAxis} />
          <YAxis {...commonAxisProps.yAxis} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            name="Adoption Rate"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAdoption)"
          />
        </AreaChart>
      );

    default:
      return null;
  }
}

// ============= PLAYBOOK TABLE COMPONENT (KEEP) =============
const ImpactText = ({ value }: { value: number }) => {
  const color =
    value > 10
      ? 'text-green-600'
      : value >= 7
      ? 'text-blue-600'
      : 'text-gray-600';
  return <span className={cn('font-semibold', color)}>+{value}%</span>;
};

function PlaybookTable({
  stage,
}: {
  stage: 'discovery' | 'demo' | 'negotiation';
}) {
  const actions = PLAYBOOK_ACTIONS[stage];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-semibold 
                          text-gray-600 uppercase tracking-wider"
            >
              Action
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-semibold 
                          text-gray-600 uppercase tracking-wider"
            >
              Team Completion
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-semibold 
                          text-gray-600 uppercase tracking-wider"
            >
              Impact on Win Rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {actions.map((action, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 transition-colors ${
                action.completion < 60 ? 'bg-red-50/30' : ''
              }`}
            >
              <td className="px-6 py-4 text-sm text-gray-900">
                {action.action}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm font-medium w-12 text-right ${
                      action.completion >= 80
                        ? 'text-green-600'
                        : action.completion >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {action.completion}%
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[200px]">
                    <div
                      className={`h-2 rounded-full ${
                        action.completion >= 80
                          ? 'bg-green-500'
                          : action.completion >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${action.completion}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-green-600">
                <ImpactText value={action.impact} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============= COACHING CARD (KEEP) =============

function CoachingCard({
  title,
  completion,
  impact,
  reps,
}: {
  title: string;
  completion: string;
  impact: string;
  reps: string;
}) {
  const bgColor = title.includes('Budget')
    ? 'bg-red-50'
    : title.includes('Multi-Thread')
    ? 'bg-yellow-50'
    : 'bg-orange-50';
  const borderColor = title.includes('Budget')
    ? 'border-red-600'
    : title.includes('Multi-Thread')
    ? 'border-yellow-600'
    : 'border-orange-600';

  return (
    <div className={`${bgColor} border-l-4 ${borderColor} rounded-lg p-5`}>
      <h3 className="text-base font-semibold text-gray-900 mb-2">🎯 {title}</h3>
      <p className="text-sm text-gray-700 mb-3">
        {completion} completion | {impact} win rate impact
      </p>
      <p className="text-xs text-gray-600 mb-3">Reps need coaching: {reps}</p>
      <Button size="sm" variant="outline" className="w-full bg-white">
        Create Team Training
      </Button>
    </div>
  );
}

export default function TeamPlaybookPage() {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [chartType, setChartType] = useState('line');
  const [timeframe, setTimeframe] = useState('30-days');

  const chartData = useMemo(() => {
    return generatePlaybookData(selectedMetric, timeframe);
  }, [selectedMetric, timeframe]);
  
  const chartTitle = useMemo(() => {
    const metrics: Record<string, string> = {
      'overall': 'Overall Playbook Adoption',
      'discovery': 'Discovery Stage Adoption',
      'demo': 'Demo Stage Adoption',
      'negotiation': 'Negotiation Stage Adoption',
      'win-rate-impact': 'Win Rate Impact'
    }
    const periods: Record<string, string> = {
      '7-days': 'Last 7 Days',
      '30-days': 'Last 30 Days',
      '90-days': 'Last Quarter'
    }
    return `${metrics[selectedMetric]} - ${periods[timeframe]}`
  }, [selectedMetric, timeframe]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Team Playbook Adoption Tracker
        </h1>
        <p className="text-base text-gray-600 mt-2">
          Track which sales actions drive wins
        </p>
      </div>

      {/* CHART SECTION WITH CONTROLS */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Metric Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Metric to Display
            </label>
            <Select
              value={selectedMetric}
              onValueChange={value => setSelectedMetric(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">Overall Adoption</SelectItem>
                <SelectItem value="discovery">
                  Discovery Stage Adoption
                </SelectItem>
                <SelectItem value="demo">Demo Stage Adoption</SelectItem>
                <SelectItem value="negotiation">
                  Negotiation Stage Adoption
                </SelectItem>
                <SelectItem value="win-rate-impact">Win Rate Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chart Type Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Chart Type
            </label>
            <Select
              value={chartType}
              onValueChange={value => setChartType(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">📈 Line Chart</SelectItem>
                <SelectItem value="bar">📊 Bar Chart</SelectItem>
                <SelectItem value="area">📉 Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timeframe Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Time Period
            </label>
            <Select
              value={timeframe}
              onValueChange={value => setTimeframe(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">Last 7 Days</SelectItem>
                <SelectItem value="30-days">Last 30 Days</SelectItem>
                <SelectItem value="90-days">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportPlaybook('csv', chartData)}
          >
            <Download className="w-3 h-3 mr-2" />
            Export Data
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportPlaybook('pdf', chartData)}
          >
            <FileText className="w-3 h-3 mr-2" />
            Export Report
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExportPlaybook('image', chartData)}
          >
            <ImageIcon className="w-3 h-3 mr-2" />
            Save Chart
          </Button>
        </div>

        {/* Chart Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {chartTitle}
        </h3>

        {/* DYNAMIC CHART */}
        <div
          className="w-full bg-gray-50 p-4 rounded-lg"
          style={{ height: '450px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(chartType, chartData)}
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABS SECTION - KEEP ALL TABS */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Playbook Actions by Stage
        </h2>

        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
            <TabsTrigger value="demo">Demo</TabsTrigger>
            <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
          </TabsList>

          {/* Discovery Tab */}
          <TabsContent value="discovery">
            <PlaybookTable stage="discovery" />
          </TabsContent>

          {/* Demo Tab */}
          <TabsContent value="demo">
            <PlaybookTable stage="demo" />
          </TabsContent>

          {/* Negotiation Tab */}
          <TabsContent value="negotiation">
            <PlaybookTable stage="negotiation" />
          </TabsContent>
        </Tabs>
      </div>

      {/* COACHING PRIORITIES - KEEP ALL CARDS */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Top 3 Coaching Priorities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CoachingCard
            title="Budget Qualification"
            completion="54%"
            impact="+18%"
            reps="Sarah, Jessica, David"
          />
          <CoachingCard
            title="Multi-Threading"
            completion="48%"
            impact="+14%"
            reps="Tom, David"
          />
          <CoachingCard
            title="Technical Stakeholder Engagement"
            completion="62%"
            impact="+12%"
            reps="John, Rachel"
          />
        </div>
      </div>
    </div>
  );
}
