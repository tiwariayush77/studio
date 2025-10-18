'use client';

import { useState } from 'react';
import Link from 'next/link';
import { REPS } from '@/lib/data';
import type { Rep } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type FilterType = "all" | "top" | "coaching";

const RepRow = ({ rep }: { rep: Rep }) => {
  const adoptionColor = rep.adoption > 85 ? 'text-green-600' : rep.adoption >= 70 ? 'text-yellow-600' : 'text-red-600';

  return (
    <TableRow className="cursor-pointer h-12">
      <TableCell>
        <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center">
          {rep.rank}
        </div>
      </TableCell>
      <TableCell>
        <Link href={`/rep-scorecard/${rep.id}`} className="flex items-center gap-2 group">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{rep.avatar}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-primary group-hover:underline">{rep.name} &rarr;</span>
        </Link>
      </TableCell>
      <TableCell className={cn("text-sm font-medium", adoptionColor)}>{rep.adoption}%</TableCell>
      <TableCell className="text-sm text-gray-700">{rep.winRate}%</TableCell>
    </TableRow>
  );
};

export function TeamPerformanceSidebar() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredReps = REPS.sort((a, b) => a.rank - b.rank).filter(rep => {
    if (filter === "top") return rep.adoption >= 85 && rep.winRate >= 38;
    if (filter === "coaching") return rep.adoption < 70 || rep.winRate < 30;
    return true;
  });

  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Team Performance</CardTitle>
        <p className="text-sm text-text-secondary">Last 30 days</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {(["all", "top", "coaching"] as FilterType[]).map(f => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? 'default' : 'ghost'}
              onClick={() => setFilter(f)}
              className={filter === f ? 'bg-blue-600 text-white' : ''}
            >
              {f === 'top' ? 'Top Performers' : f === 'coaching' ? 'Needs Coaching' : 'All'}
            </Button>
          ))}
        </div>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Rep</TableHead>
              <TableHead>Adoption</TableHead>
              <TableHead>Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReps.map(rep => (
              <RepRow key={rep.id} rep={rep} />
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-gray-500 mb-2">
                Showing {filteredReps.length} of {REPS.length} reps
            </p>
          <Link href="/team-playbook" className="text-sm text-primary hover:underline">
            View full team playbook &rarr;
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
