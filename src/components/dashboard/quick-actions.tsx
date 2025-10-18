import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ActionButton = ({ icon: Icon, children, href = "#" }: { icon: React.ElementType, children: React.ReactNode, href?: string }) => (
    <Button asChild variant="ghost" className="w-full justify-start text-primary hover:bg-blue-50 p-2 h-auto text-sm font-normal">
        <Link href={href}>
            <Icon className="w-4 h-4 mr-2" />
            {children}
        </Link>
    </Button>
);

export function QuickActions() {
    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="text-sm font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-1">
                <ActionButton icon={FileText}>Export Pipeline Report</ActionButton>
                <ActionButton icon={Calendar}>Schedule Team Review</ActionButton>
                <ActionButton icon={TrendingUp}>View Risk Trends</ActionButton>
            </CardContent>
        </Card>
    );
}
