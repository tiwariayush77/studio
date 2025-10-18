"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, FileText, LayoutDashboard, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(`flex items-center gap-2 h-full px-1 text-sm font-medium
                 border-b-2 transition-colors`,
                 isActive 
                   ? 'border-blue-600 text-blue-600' 
                   : 'border-transparent text-gray-600 hover:text-gray-900')}
    >
      {children}
    </Link>
  );
};


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top bar */}
      <div className="h-16 border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-6 flex h-full items-center justify-between">
          
          <Link href="/" className="cursor-pointer hover:opacity-90 transition-opacity">
            <Image 
              src="/zime-coral-black.jpg"
              alt="ZIME AI"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

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
      </div>

       {/* Navigation tabs */}
      <div className="h-12">
        <div className="max-w-[1600px] mx-auto px-6 h-full">
          <nav className="flex items-center gap-8 h-full">
            <NavLink href="/">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>
            
            <NavLink href="/team-playbook">
              <BookOpen className="w-4 h-4" />
              Team Playbook
            </NavLink>
            
            <NavLink href="/analytics">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
