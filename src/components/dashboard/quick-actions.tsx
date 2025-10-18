'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEALS } from "@/lib/data";

export function QuickActions() {
    const router = useRouter();

    const handleExportPipeline = () => {
        const csvData = DEALS.map(deal => ({
            Company: deal.company,
            Product: deal.product,
            Value: deal.value,
            Stage: deal.stage,
            RiskScore: deal.riskScore,
            Rep: deal.rep.name
        }));

        const headers = Object.keys(csvData[0]).join(',');
        const rows = csvData.map(row => Object.values(row).join(','));
        const csv = [headers, ...rows].join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
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
        const subject = 'Team Performance Review';
        const body = 'Weekly pipeline review meeting';
        const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    };

    const handleViewTrends = () => {
        router.push('/analytics?view=risk-trends');
    };

    return (
        <Card className="bg-white rounded-lg p-4 shadow-sm">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-1">
                <Button onClick={handleExportPipeline} variant="ghost" className="w-full justify-start text-primary hover:bg-blue-50 p-2 h-auto text-sm font-normal">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Pipeline Report
                </Button>
                <Button onClick={handleScheduleReview} variant="ghost" className="w-full justify-start text-primary hover:bg-blue-50 p-2 h-auto text-sm font-normal">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Team Review
                </Button>
                 <Button onClick={handleViewTrends} variant="ghost" className="w-full justify-start text-primary hover:bg-blue-50 p-2 h-auto text-sm font-normal">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Risk Trends
                </Button>
            </CardContent>
        </Card>
    );
}
