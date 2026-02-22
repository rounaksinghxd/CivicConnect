import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Issue } from "@/lib/store";
import { MapPin, Calendar, Clock, CheckCircle } from "lucide-react";

export function IssueCard({ issue }: { issue: Issue }) {
    const getStatusColor = (status: Issue["status"]) => {
        switch (status) {
            case "Reported": return "bg-amber-100 text-amber-800 border-amber-200";
            case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Resolved": return "bg-emerald-100 text-emerald-800 border-emerald-200";
        }
    };

    const getStatusIcon = (status: Issue["status"]) => {
        switch (status) {
            case "Reported": return <Clock className="h-4 w-4 mr-1" />;
            case "In Progress": return <Clock className="h-4 w-4 mr-1" />;
            case "Resolved": return <CheckCircle className="h-4 w-4 mr-1" />;
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full border-slate-200/80">
            {issue.photoUrl && (
                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    {/* Using a standard img tag for simplicity in mock, next/image would be better for prod */}
                    <img
                        src={issue.photoUrl}
                        alt={issue.title}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <Badge variant="outline" className={`${getStatusColor(issue.status)} flex items-center`}>
                        {getStatusIcon(issue.status)}
                        {issue.status}
                    </Badge>
                    <Badge variant="secondary">{issue.category}</Badge>
                </div>
                <h3 className="font-semibold text-lg line-clamp-1 text-slate-900">{issue.title}</h3>
            </CardHeader>

            <CardContent className="pb-4 flex-1">
                <p className="text-slate-600 text-sm line-clamp-2">{issue.description}</p>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2 pt-0 text-xs text-slate-500 border-t border-slate-100 mt-2 p-4">
                <div className="flex items-center gap-2 w-full truncate">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{issue.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
