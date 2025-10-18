'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

// ============= DATA GENERATION =============

function generateChartData(metric: string, timeframe: string, rep: string) {
  const periods: { [key: string]: number } = {
    '7-days': 7,
    '30-days': 30,
    '90-days': 90,
    '180-days': 180,
    '365-days': 365,
  };

  const days = periods[timeframe] || 30;
  const weeks = Math.ceil(days / 7);

  switch (metric) {
    case 'pipeline-velocity':
      return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        discovery: Math.floor(Math.random() * 10) + 10,
        demo: Math.floor(Math.random() * 8) + 8,
        negotiation: Math.floor(Math.random() * 5) + 5,
      }));

    case 'win-rate-trend':
      return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        winRate: Math.floor(Math.random() * 15) + 30,
      }));

    case 'deal-size':
      return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        avgDealSize: Math.floor(Math.random() * 20) + 40,
      }));

    case 'sales-cycle':
      return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        days: Math.floor(Math.random() * 15) + 35,
      }));

    case 'stage-conversion':
      return [
        { label: 'Discovery → Demo', rate: 62 },
        { label: 'Demo → Negotiation', rate: 54 },
        { label: 'Negotiation → Closed', rate: 80 },
      ];

    case 'rep-performance':
      const reps = [
        'John',
        'Sarah',
        'Mike',
        'Jessica',
        'David',
        'Emily',
        'Rachel',
        'Tom',
      ];
      return reps
        .slice(0, rep === 'top-5' ? 5 : rep === 'bottom-5' ? 5 : 8)
        .map(name => ({
          label: name,
          winRate: Math.floor(Math.random() * 30) + 20,
          adoption: Math.floor(Math.random() * 30) + 60,
        }));

    case 'revenue-forecast':
      return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        forecast: Math.floor(Math.random() * 100) + 400,
        actual: Math.floor(Math.random() * 80) + 350,
      }));

    case 'activity-volume':
      return Array.from({ length: weeks }, (_, i) => ({
        label: `Week ${i + 1}`,
        calls: Math.floor(Math.random() * 50) + 100,
        emails: Math.floor(Math.random() * 100) + 200,
        meetings: Math.floor(Math.random() * 30) + 50,
      }));

    default:
      return [];
  }
}

function getChartTitle(metric: string, timeframe: string) {
  const titles: { [key: string]: string } = {
    'pipeline-velocity': 'Pipeline Velocity',
    'win-rate-trend': 'Win Rate Trend',
    'deal-size': 'Average Deal Size',
    'sales-cycle': 'Sales Cycle Length',
    'stage-conversion': 'Stage Conversion Rates',
    'rep-performance': 'Rep Performance Comparison',
    'revenue-forecast': 'Revenue Forecast vs Actual',
    'activity-volume': 'Sales Activity Volume',
  };

  const periods: { [key: string]: string } = {
    '7-days': 'Last 7 Days',
    '30-days': 'Last 30 Days',
    '90-days': 'Last Quarter',
    '180-days': 'Last 6 Months',
    '365-days': 'Last Year',
  };

  return `${titles[metric]} - ${periods[timeframe]}`;
}

// ============= EXPORT FUNCTIONS =============

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

function handleExport(type: 'csv' | 'pdf' | 'image', data: any[], metric: string) {
  if (type === 'csv') {
    const csv = convertToCSV(data);
    downloadFile(csv, `${metric}-${Date.now()}.csv`, 'text/csv');
  } else if (type === 'pdf') {
    alert('PDF export will be implemented with jsPDF library');
  } else if (type === 'image') {
    alert('Image export will be implemented with html2canvas library');
  }
}

// ============= CHART RENDERING =============

function renderChart(type: string, data: any[], metric: string) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const dataKeys = Object.keys(data[0]).filter(
    key => key !== 'label' && key !== 'name'
  );
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  const commonProps = {
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  switch (type) {
    case 'line':
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="label"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2.5}
              dot={{ fill: COLORS[i % COLORS.length], r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      );

    case 'bar':
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="label"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {dataKeys.map((key, i) => (
            <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} />
          ))}
        </BarChart>
      );

    case 'area':
      return (
        <AreaChart {...commonProps}>
          <defs>
            {dataKeys.map((key, i) => (
              <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={COLORS[i % COLORS.length]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS[i % COLORS.length]}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="label"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {dataKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[i % COLORS.length]}
              fillOpacity={1}
              fill={`url(#color${key})`}
            />
          ))}
        </AreaChart>
      );

    case 'pie':
      return (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey={dataKeys[0]}
            nameKey="label"
            label={entry => `${entry.label}: ${entry[dataKeys[0]]}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );

    case 'radar':
      return (
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="label" style={{ fontSize: '12px' }} />
          <PolarRadiusAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, i) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.3}
            />
          ))}
        </RadarChart>
      );

    case 'scatter':
      return (
        <ScatterChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="label"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {dataKeys.map((key, i) => (
            <Scatter
              key={key}
              name={key}
              dataKey={key}
              fill={COLORS[i % COLORS.length]}
            />
          ))}
        </ScatterChart>
      );

    default:
      return null;
  }
}

// ============= PAGE COMPONENTS =============

function MetricCard({
  title,
  value,
  trend,
  positive,
}: {
  title: string;
  value: string;
  trend: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      <div className="mt-2 flex items-center gap-1">
        {positive ? (
          <TrendingUp className="h-3 w-3 text-green-600" />
        ) : (
          <TrendingDown className="h-3 w-3 text-red-600" />
        )}
        <span
          className={`text-xs font-medium ${
            positive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend}
        </span>
        <span className="text-xs text-gray-500">vs last period</span>
      </div>
    </div>
  );
}

function FunnelStage({
  name,
  deals,
  value,
  conversion,
  color,
}: {
  name: string;
  deals: number;
  value: string;
  conversion: number | null;
  color: string;
}) {
  const colors: { [key: string]: string } = {
    blue: 'from-blue-50 to-blue-100 border-blue-500 text-blue-700',
    emerald:
      'from-emerald-50 to-emerald-100 border-emerald-500 text-emerald-700',
    amber: 'from-amber-50 to-amber-100 border-amber-500 text-amber-700',
    indigo: 'from-indigo-50 to-indigo-100 border-indigo-500 text-indigo-700',
  };

  return (
    <div
      className={`rounded-lg border-l-4 bg-gradient-to-r p-4 transition-all hover:shadow-md ${colors[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide">
            {name}
          </p>
          <p className="text-2xl font-bold">{deals} deals</p>
          <p className="mt-1 text-sm">{value}</p>
        </div>
        {conversion ? (
          <div className="text-right">
            <p className="mb-1 text-xs text-gray-600">Conversion</p>
            <p className="text-xl font-bold text-gray-900">{conversion}%</p>
            <div className="mt-2 h-2 w-20 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full bg-${color}-500`}
                style={{ width: `${conversion}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <span
            className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium
                         text-green-700"
          >
            Win Rate: 36%
          </span>
        )}
      </div>
    </div>
  );
}

function DealStageFunnel() {
  const stages = [
    {
      name: 'Discovery',
      deals: 45,
      value: '$820K',
      conversion: 62,
      color: 'blue',
    },
    { name: 'Demo', deals: 28, value: '$640K', conversion: 54, color: 'emerald' },
    {
      name: 'Negotiation',
      deals: 15,
      value: '$580K',
      conversion: 80,
      color: 'amber',
    },
    {
      name: 'Closed Won',
      deals: 12,
      value: '$420K',
      conversion: null,
      color: 'indigo',
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Deal Stage Funnel
      </h3>
      <div className="space-y-3">
        {stages.map(stage => (
          <FunnelStage key={stage.name} {...stage} />
        ))}
      </div>
    </div>
  );
}

function WinLossAnalysis() {
  const winLossData = [
    { name: 'Won', value: 36 },
    { name: 'Lost', value: 64 },
  ];

  const lossReasons = [
    { name: 'Price', value: 28, color: '#3B82F6' },
    { name: 'No budget', value: 22, color: '#8B5CF6' },
    { name: 'Competitor', value: 18, color: '#F59E0B' },
    { name: 'Timing', value: 15, color: '#6B7280' },
    { name: 'Other', value: 17, color: '#EC4899' },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Win/Loss Analysis
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={winLossData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={entry => `${entry.name}: ${entry.value}%`}
          >
            <Cell fill="#10B981" />
            <Cell fill="#EF4444" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <h4 className="mb-3 text-sm font-semibold text-gray-700">
          Top Loss Reasons:
        </h4>
        <div className="space-y-2">
          {lossReasons.map(reason => (
            <div key={reason.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{reason.name}</span>
              <div className="ml-4 flex flex-1 items-center gap-2">
                <div className="h-2 max-w-[150px] flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${reason.value}%`,
                      backgroundColor: reason.color,
                    }}
                  ></div>
                </div>
                <span className="w-10 text-right text-sm font-medium text-gray-900">
                  {reason.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  // State Management
  const [selectedMetric, setSelectedMetric] = useState('pipeline-velocity');
  const [chartType, setChartType] = useState('line');
  const [timeframe, setTimeframe] = useState('30-days');
  const [selectedRep, setSelectedRep] = useState('all');
  const [chartData, setChartData] = useState<any[]>([]);

  // Update chart data when any control changes
  useEffect(() => {
    const newData = generateChartData(selectedMetric, timeframe, selectedRep);
    setChartData(newData);
  }, [selectedMetric, timeframe, selectedRep]);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
        <p className="mt-2 text-base text-gray-600">
          Performance insights and trends
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricCard title="Total Pipeline" value="$691K" trend="+12.5%" positive />
        <MetricCard
          title="Average Deal Size"
          value="$48K"
          trend="+3.2%"
          positive
        />
        <MetricCard
          title="Win Rate"
          value="36%"
          trend="-2.1%"
          positive={false}
        />
        <MetricCard
          title="Sales Cycle"
          value="42 days"
          trend="+5 days"
          positive={false}
        />
      </div>

      {/* DYNAMIC CHART SECTION WITH CONTROLS */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        {/* Control Panel */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Metric Selector */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Metric to Display
            </label>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pipeline-velocity">
                  Pipeline Velocity
                </SelectItem>
                <SelectItem value="win-rate-trend">Win Rate Trend</SelectItem>
                <SelectItem value="deal-size">Average Deal Size</SelectItem>
                <SelectItem value="sales-cycle">Sales Cycle Length</SelectItem>
                <SelectItem value="stage-conversion">
                  Stage Conversion
                </SelectItem>
                <SelectItem value="rep-performance">Rep Performance</SelectItem>
                <SelectItem value="revenue-forecast">Revenue Forecast</SelectItem>
                <SelectItem value="activity-volume">Activity Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chart Type Selector */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Chart Type
            </label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">📈 Line Chart</SelectItem>
                <SelectItem value="bar">📊 Bar Chart</SelectItem>
                <SelectItem value="area">📉 Area Chart</SelectItem>
                <SelectItem value="pie">🥧 Pie Chart</SelectItem>
                <SelectItem value="radar">🎯 Radar Chart</SelectItem>
                <SelectItem value="scatter">⚫ Scatter Plot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timeframe Selector */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Time Period
            </label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7-days">Last 7 Days</SelectItem>
                <SelectItem value="30-days">Last 30 Days</SelectItem>
                <SelectItem value="90-days">Last Quarter</SelectItem>
                <SelectItem value="180-days">Last 6 Months</SelectItem>
                <SelectItem value="365-days">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rep Filter (shows only for rep-performance metric) */}
          {selectedMetric === 'rep-performance' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Compare Reps
              </label>
              <Select value={selectedRep} onValueChange={setSelectedRep}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reps</SelectItem>
                  <SelectItem value="top-5">Top 5 Performers</SelectItem>
                  <SelectItem value="bottom-5">Bottom 5 Performers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Export Buttons */}
        <div className="mb-6 flex gap-2 border-b border-gray-200 pb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport('csv', chartData, selectedMetric)}
          >
            <Download className="mr-2 h-3 w-3" />
            Export CSV
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport('pdf', chartData, selectedMetric)}
          >
            <FileText className="mr-2 h-3 w-3" />
            Export PDF
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport('image', chartData, selectedMetric)}
          >
            <ImageIcon className="mr-2 h-3 w-3" />
            Save Image
          </Button>
        </div>

        {/* Chart Title */}
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          {getChartTitle(selectedMetric, timeframe)}
        </h3>

        {/* Dynamic Chart Rendering */}
        <div id="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            {renderChart(chartType, chartData, selectedMetric)}
          </ResponsiveContainer>
        </div>
      </div>

      {/* DEAL STAGE FUNNEL & WIN/LOSS - ALWAYS VISIBLE */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DealStageFunnel />
        <WinLossAnalysis />
      </div>
    </div>
  );
}