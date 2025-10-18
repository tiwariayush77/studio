"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PLAYBOOK_ACTIONS } from "@/lib/data";
import type { PlaybookAction } from "@/lib/types";
import { cn } from "@/lib/utils";

const CompletionBar = ({ value }: { value: number }) => {
    const color = value > 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={cn("h-2.5 rounded-full", color)} style={{ width: `${value}%` }}></div>
        </div>
    );
}

const ImpactText = ({ value }: { value: number }) => {
    const color = value > 10 ? 'text-green-600' : value >= 7 ? 'text-blue-600' : 'text-gray-600';
    return <span className={cn("font-semibold", color)}>+{value}%</span>;
}

const ActionsTable = ({ actions }: { actions: PlaybookAction[] }) => (
    <Table>
        <TableHeader className="bg-gray-50">
            <TableRow>
                <TableHead className="w-[40%]">Action</TableHead>
                <TableHead>Team Completion</TableHead>
                <TableHead>Impact on Win Rate</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {actions.map(action => (
                <TableRow key={action.action} className="hover:bg-gray-50">
                    <TableCell className={cn("font-medium", action.completion < 60 && "text-red-700")}>{action.action}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-4">
                            <span className="w-12 text-right">{action.completion}%</span>
                            <CompletionBar value={action.completion} />
                        </div>
                    </TableCell>
                    <TableCell><ImpactText value={action.impact} /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export function PlaybookBreakdown() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Playbook Actions by Stage</h2>
      <Tabs defaultValue="discovery">
        <TabsList>
          <TabsTrigger value="discovery">Discovery</TabsTrigger>
          <TabsTrigger value="demo">Demo</TabsTrigger>
          <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
        </TabsList>
        <TabsContent value="discovery" className="mt-4">
          <ActionsTable actions={PLAYBOOK_ACTIONS.discovery} />
        </TabsContent>
        <TabsContent value="demo" className="mt-4">
          <ActionsTable actions={PLAYBOOK_ACTIONS.demo} />
        </TabsContent>
        <TabsContent value="negotiation" className="mt-4">
          <ActionsTable actions={PLAYBOOK_ACTIONS.negotiation} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
