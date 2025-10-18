import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ActionLink = ({ children, href = "#" }: { children: React.ReactNode, href?: string }) => (
    <Link href={href} className="text-sm text-primary hover:underline cursor-pointer">
        {children}
    </Link>
);

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <ActionLink>📊 Export Pipeline Report</ActionLink>
                <ActionLink>📅 Schedule Team Review</ActionLink>
                <ActionLink>📈 View Risk Trends</ActionLink>
            </CardContent>
        </Card>
    );
}
