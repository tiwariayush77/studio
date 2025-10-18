"use client";

import Link from "next/link";
import { Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="max-w-[1600px] mx-auto px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            ZIME
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
            <div className="w-96 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    placeholder="Search deals, reps, or calls..."
                    className="w-full h-10 bg-background pl-10 focus:bg-card"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 hidden md:inline">All systems ready</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Salesforce: Synced 2min ago</p>
                <p>Gong: Synced 5min ago</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" asChild>
            <a href="/mock.pdf" download="zime-report.pdf" className="text-text-secondary">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </a>
          </Button>

          <Avatar className="h-9 w-9">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                <AvatarFallback className="bg-transparent text-sm font-semibold text-white">AT</AvatarFallback>
            </div>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
