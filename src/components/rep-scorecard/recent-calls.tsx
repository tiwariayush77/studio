import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Rep } from "@/lib/types";
import { cn } from "@/lib/utils";

const sentimentStyles = {
    positive: "bg-green-100 text-green-800",
    neutral: "bg-yellow-100 text-yellow-800",
    negative: "bg-red-100 text-red-800",
};

const CircularProgress = ({ value }: { value: number }) => {
    const color = value > 80 ? 'text-green-500' : value > 60 ? 'text-yellow-500' : 'text-red-500';
    const background = value > 80 ? 'text-green-100' : value > 60 ? 'text-yellow-100' : 'text-red-100';
    const circumference = 2 * Math.PI * 15;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative h-10 w-10">
            <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" className={`stroke-current ${background}`} strokeWidth="3" fill="transparent" />
                <circle cx="18" cy="18" r="15.915" className={`stroke-current ${color}`} strokeWidth="3" fill="transparent"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${color}`}>{value}</span>
        </div>
    );
}

export function RecentCalls({ rep }: { rep: Rep }) {
    if (!rep.recentCalls) {
        return null;
    }

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Sentiment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rep.recentCalls.map((call) => (
                            <TableRow key={call.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <Link href={`/call-analysis/${call.id}`} className="hover:underline">{call.date}</Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/call-analysis/${call.id}`} className="hover:underline">{call.company}</Link>
                                </TableCell>
                                <TableCell>
                                    <CircularProgress value={call.score} />
                                </TableCell>
                                <TableCell>{call.duration} mins</TableCell>
                                <TableCell>
                                    <Badge className={cn("capitalize", sentimentStyles[call.sentiment])}>
                                        {call.sentiment}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
