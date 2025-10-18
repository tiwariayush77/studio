'use client';
import { useRouter } from 'next/navigation';
import { DEALS } from "@/lib/data";
import { FileText, Calendar, TrendingUp } from "lucide-react";

export function QuickActions() {
    const router = useRouter();

    const handleExportPipeline = () => {
        const csvData = DEALS.map(deal => ({
          Company: deal.company,
          Product: deal.product,
          Value: deal.value,
          Stage: deal.stage,
          'Risk Score': deal.riskScore,
          Rep: deal.rep.name,
          'Days in Stage': deal.daysInStage
        }));
        
        const headers = Object.keys(csvData[0]).join(',');
        const rows = csvData.map(row => Object.values(row).map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));
        const csv = [headers, ...rows].join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pipeline-report-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleScheduleReview = () => {
        const subject = 'Weekly Pipeline Review Meeting';
        const body = `Hi Team,

Let's review the pipeline performance and discuss action items.

Key Topics:
- High risk deals requiring attention (${DEALS.filter(d => d.riskLevel === 'high').length} deals)
- Team performance trends
- Coaching opportunities

Best regards`;
        const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    };

    const handleViewTrends = () => {
        router.push('/analytics');
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Actions
            </h4>
            <div className="space-y-2">
                <button
                    onClick={handleExportPipeline}
                    className="flex items-center gap-2 w-full text-left text-sm text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                >
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span>Export Pipeline Report</span>
                </button>
                <button
                    onClick={handleScheduleReview}
                    className="flex items-center gap-2 w-full text-left text-sm text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                >
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Schedule Team Review</span>
                </button>
                <button
                    onClick={handleViewTrends}
                    className="flex items-center gap-2 w-full text-left text-sm text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                >
                    <TrendingUp className="w-4 h-4 flex-shrink-0" />
                    <span>View Risk Trends</span>
                </button>
            </div>
        </div>
    );
}
