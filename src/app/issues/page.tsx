import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IssueCard } from "@/components/issue-card";
import { getIssues } from "@/app/actions";
import { MapPin, PlusCircle, ArrowLeft, Search } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function IssuesPage() {
    const issues = await getIssues();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="px-6 py-4 bg-white border-b flex justify-between items-center sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium text-slate-600 hidden sm:inline">Back Home</span>
                </Link>
                <div className="flex items-center gap-2 text-indigo-600">
                    <MapPin className="h-6 w-6" />
                    <span className="font-bold text-xl hidden sm:inline">Civic Connect</span>
                </div>
                <Link href="/dashboard">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Report <span className="hidden sm:inline">Issue</span>
                    </Button>
                </Link>
            </header>

            <main className="flex-1 p-6 lg:p-8 flex flex-col h-[calc(100vh-73px)]">

                {/* Filters & Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Recent Reports</h1>
                        <p className="text-slate-500">View and track civic issues in your neighborhood.</p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-12">
                    {issues.length > 0 ? (
                        issues.map(issue => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center flex flex-col items-center">
                            <Search className="h-12 w-12 text-slate-300 mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">No issues found</h3>
                            <p className="text-slate-500">There are no reported issues yet.</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
