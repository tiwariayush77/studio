import type { Rep } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const scoreGradient = (score: number) => {
    if (score > 8.5) return "from-green-600 to-green-700";
    if (score > 7.5) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
}

export function RepHeaderCard({ rep }: { rep: Rep }) {
    return (
        <Card className="p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                     <Avatar className="h-20 w-20">
                        <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                            <AvatarFallback className="bg-transparent text-2xl font-bold text-white">{rep.avatar}</AvatarFallback>
                        </div>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{rep.name}</h1>
                        <p className="text-base text-gray-600">{rep.title}</p>
                        <div className="mt-3 flex gap-4 text-sm">
                            <a href={`mailto:${rep.email}`} className="flex items-center gap-2 text-primary hover:underline">
                                <Mail className="h-4 w-4" />
                                {rep.email}
                            </a>
                            <div className="flex items-center gap-2 text-text-secondary">
                                <Phone className="h-4 w-4" />
                                {rep.phone}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br flex flex-col items-center justify-center ${scoreGradient(rep.score)}`}>
                        <span className="text-3xl font-bold text-white">{rep.score}</span>
                        <span className="text-sm text-white opacity-80 -mt-1">/10</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-sm font-semibold mt-2">#{rep.rank} on team</Badge>
                </div>
            </div>
        </Card>
    );
}
