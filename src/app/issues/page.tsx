"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IssueCard } from "@/components/issue-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getIssues, CATEGORIES } from "@/lib/store";
import { MapPin, Search, PlusCircle, ArrowLeft, LayoutGrid, Map as MapIcon } from "lucide-react";

export default function IssuesPage() {
    const [issues] = useState(getIssues());
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [view, setView] = useState<"list" | "map">("list");

    const filteredIssues = issues.filter(issue => {
        const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) ||
            issue.description.toLowerCase().includes(search.toLowerCase()) ||
            issue.location.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

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

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search issues..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-[140px]">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {CATEGORIES.map(c => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="flex rounded-md border border-slate-200 p-1 bg-white">
                            <Button
                                variant={view === "list" ? "secondary" : "ghost"}
                                size="sm"
                                className="w-10 px-0 h-8"
                                onClick={() => setView("list")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={view === "map" ? "secondary" : "ghost"}
                                size="sm"
                                className="w-10 px-0 h-8"
                                onClick={() => setView("map")}
                            >
                                <MapIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                {view === "list" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-12">
                        {filteredIssues.length > 0 ? (
                            filteredIssues.map(issue => (
                                <IssueCard key={issue.id} issue={issue} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center flex flex-col items-center">
                                <Search className="h-12 w-12 text-slate-300 mb-4" />
                                <h3 className="text-lg font-medium text-slate-900">No issues found</h3>
                                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 bg-slate-200 border border-slate-300 rounded-xl overflow-hidden relative flex items-center justify-center">
                        {/* Mock Map View */}
                        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }} />

                        <div className="z-10 bg-white/90 backdrop-blur p-6 rounded-xl shadow-xl border border-slate-200 max-w-sm text-center">
                            <MapIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Interactive Map Area</h3>
                            <p className="text-sm text-slate-500 mb-4">
                                In a full application, this would integrate with Google Maps or Mapbox to display pins for all filtered issues ({filteredIssues.length} currently).
                            </p>
                            <Button variant="outline" onClick={() => setView("list")}>Back to List View</Button>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
