"use client";

import { usePathname } from "next/navigation";
import { Sparkles, Bot, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const suggestionsByRoute: Record<string, string[]> = {
  "/": [
    "Why is Acme Corp high-risk?",
    "Which deals need attention today?",
    "Show me calls where budget wasn't discussed",
    "Why is Sarah's win rate lower?",
  ],
  "/rep-scorecard": [
    "How can Sarah improve win rate?",
    "Create coaching plan for budget qualification",
    "Show Sarah's best performing calls",
    "Compare Sarah vs top performer John",
  ],
  "/call-analysis": [
    "What went wrong in this call?",
    "Draft feedback email for Sarah on this call",
    "Find similar calls that closed successfully",
    "What should Sarah do next?",
  ],
  "/team-playbook": [
    "Which action has biggest impact on win rate?",
    "Why is budget qualification completion low?",
    "Create team training plan for multi-threading",
    "Show improvement trends over last quarter",
  ],
};

const SuggestionButton = ({ children }: { children: React.ReactNode }) => (
  <Button
    variant="outline"
    className="w-full justify-start text-left h-auto py-3 text-blue-700 bg-white border-blue-200 hover:bg-blue-50"
  >
    {children}
  </Button>
);

interface AIAssistantProps {
  onClose: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const pathname = usePathname();

  const getRouteKey = () => {
    if (pathname === "/") return "/";
    if (pathname.startsWith("/rep-scorecard")) return "/rep-scorecard";
    if (pathname.startsWith("/call-analysis")) return "/call-analysis";
    if (pathname.startsWith("/team-playbook")) return "/team-playbook";
    return "/";
  };
  
  const suggestions = suggestionsByRoute[getRouteKey()];

  return (
    <div className={cn("fixed top-20 right-6 z-40 w-[400px] h-[550px] transition-all duration-300 opacity-100 translate-y-0")}>
      <Card className="h-full w-full shadow-2xl flex flex-col">
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg p-5 text-white relative">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <p className="text-sm opacity-80">Ask me about your pipeline</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </header>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-5 border-b">
            <p className="text-sm font-medium text-gray-600 mb-3">I can help with:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((s) => (
                <SuggestionButton key={s}>{s}</SuggestionButton>
              ))}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <p className="text-sm font-medium text-gray-600 mb-2">Or ask me anything:</p>
            <Textarea
              placeholder="E.g., Why are deals stalling in demo stage?"
              className="h-20 resize-none flex-1"
            />
            <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Ask
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
