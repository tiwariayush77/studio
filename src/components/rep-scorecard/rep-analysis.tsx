import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Lightbulb, Sparkles } from "lucide-react";
import type { Rep } from "@/lib/types";

const ListItem = ({ children, icon: Icon, color }: { children: React.ReactNode, icon: React.ElementType, color: string }) => (
    <li className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${color}`} />
        <span>{children}</span>
    </li>
);

export function RepAnalysis({ rep }: { rep: Rep }) {
    return (
        <div className="mt-6 space-y-4">
            <Accordion type="multiple" defaultValue={['strengths']} className="w-full space-y-4">
                <Card>
                    <AccordionItem value="strengths" className="border-b-0">
                        <AccordionTrigger className="p-6 font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Strengths
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <ul className="space-y-2 text-text-secondary">
                                {rep.strengths.map(strength => (
                                    <ListItem key={strength} icon={CheckCircle} color="text-green-500">{strength}</ListItem>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Card>
                <Card>
                    <AccordionItem value="improvements" className="border-b-0">
                        <AccordionTrigger className="p-6 font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-5 w-5 text-yellow-600" />
                                Areas for Improvement
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <ul className="space-y-3 text-text-secondary">
                                <ListItem icon={AlertCircle} color="text-yellow-500">
                                    Budget qualification - Skipped in 60% of discovery calls
                                    <p className="text-sm text-text-subtle pl-4 mt-1">- Impact: Deals without budget discussion close 18% less often</p>
                                </ListItem>
                                <ListItem icon={AlertCircle} color="text-yellow-500">
                                    Multi-threading - Engages 1.2 stakeholders vs 2.4 team avg
                                </ListItem>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Card>
                 <Card>
                    <AccordionItem value="recommendations" className="border-b-0">
                        <AccordionTrigger className="p-6 font-semibold hover:no-underline">
                            <div className="flex items-center gap-3">
                                <Lightbulb className="h-5 w-5 text-blue-600" />
                                AI Coaching Recommendations
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                           <ul className="space-y-2 text-text-secondary">
                                <ListItem icon={Lightbulb} color="text-blue-500">Share call recording from John Smith (top performer) showing budget qualification</ListItem>
                                <ListItem icon={Lightbulb} color="text-blue-500">Add budget discussion to next 3 pre-call checklists</ListItem>
                                <ListItem icon={Lightbulb} color="text-blue-500">Schedule role-play session for multi-threading scenarios</ListItem>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Card>
            </Accordion>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">AI-Generated Coaching Plan</h3>
                        <p className="text-sm text-text-secondary">Based on 42 analyzed calls from last 30 days</p>
                    </div>
                </div>
                <Card className="p-4 mt-4 shadow-sm">
                    <p className="font-semibold">🎯 Priority: Improve budget qualification</p>
                    <p className="text-sm text-green-700 mt-1">Expected impact: +12% win rate increase</p>
                    <Button size="sm" className="mt-3 bg-purple-600 hover:bg-purple-700">Create Coaching Task</Button>
                </Card>
            </div>
        </div>
    );
}
