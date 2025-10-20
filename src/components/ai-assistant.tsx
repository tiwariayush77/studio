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
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />
      
      {/* Slide-Out Panel */}
      <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50
                      flex flex-col slide-in-right">
        
        {/* Panel Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Assistant</h3>
              <p className="text-sm opacity-90">Ask me about your pipeline</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Panel Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Quick Suggestions */}
          <div className="p-6 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-4">I can help with:</p>
            <div className="grid gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg border border-blue-100 
                            bg-blue-50/50 hover:bg-blue-100/50
                            text-blue-700 hover:text-blue-800 
                            transition-all duration-200 text-sm font-medium"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-sm font-semibold text-gray-700 mb-3">Or ask me anything:</p>
            <div className="flex-1 flex flex-col">
              <Textarea
                placeholder="E.g., Why are deals stalling in demo stage?"
                className="flex-1 resize-none border-gray-200 focus:border-purple-300 
                          focus:ring-purple-200 min-h-[120px]"
              />
              <Button 
                className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 
                          hover:from-blue-700 hover:to-blue-800
                          text-white font-semibold py-3 h-auto rounded-lg
                          transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="h-4 w-4 mr-2" />
                Ask Zime AI
              </Button>
            </div>
          </div>
          
        </div>
         {/* Footer */}
          <div className="border-t border-gray-100 p-4 bg-gray-50/70">
            <p className="text-xs text-gray-500 text-center">
              Powered by Zime AI - Secure & Private
            </p>
          </div>
      </div>
    </>
  );
}