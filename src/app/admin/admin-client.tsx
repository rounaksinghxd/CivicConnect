"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IssueStatus, CATEGORIES } from "@/lib/store";
import { updateIssueStatusAction } from "@/app/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Search, ArrowLeft, MoreHorizontal, CheckCircle, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminClientProps {
    initialIssues: any[]; // Prisma issue
}

export default function AdminClient({ initialIssues }: AdminClientProps) {
    const [issues, setIssues] = useState(initialIssues);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [isPending, startTransition] = useTransition();

    const filteredIssues = issues.filter(issue => {
        const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) ||
            issue.id.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleStatusUpdate = (id: string, newStatus: IssueStatus) => {
        startTransition(async () => {
            // Optimistic update
            const updatedIssues = issues.map(i => i.id === id ? { ...i, status: newStatus } : i);
            setIssues(updatedIssues);

            // Server update
            await updateIssueStatusAction(id, newStatus);
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Reported": return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 gap-1"><AlertTriangle className="h-3 w-3" /> Reported</Badge>;
            case "In Progress": return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
            case "Resolved": return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1"><CheckCircle className="h-3 w-3" /> Resolved</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="px-6 py-4 bg-slate-900 text-white border-b border-slate-800 flex justify-between items-center sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium hidden sm:inline">Exit Admin</span>
                </Link>
                <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-indigo-400" />
                    <span className="font-bold text-xl">Civic Connect <span className="text-slate-400 font-normal">Admin</span></span>
                </div>
                <div className="w-24 text-right text-sm text-slate-400 flex items-center justify-end gap-2">
                    {isPending && <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />}
                    SuperUser
                </div>
            </header>

            <main className="flex-1 p-6 lg:p-8 flex flex-col h-[calc(100vh-73px)]">

                {/* Admin Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search ID or Title..."
                                className="pl-9 bg-slate-50"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-full sm:w-[160px] bg-slate-50">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[160px] bg-slate-50">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="Reported">Reported</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm font-medium text-slate-500 bg-slate-100 px-4 py-2 rounded-lg whitespace-nowrap">
                        Total Issues: {filteredIssues.length}
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[120px]">ID</TableHead>
                                    <TableHead className="min-w-[200px]">Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead className="w-[140px]">Date</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead className="w-[70px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIssues.length > 0 ? (
                                    filteredIssues.map((issue) => (
                                        <TableRow key={issue.id} className="cursor-pointer hover:bg-slate-50/50">
                                            <TableCell className="font-mono text-slate-500 truncate max-w-[120px]" title={issue.id}>{issue.id}</TableCell>
                                            <TableCell className="font-medium text-slate-900">{issue.title}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="font-normal">{issue.category}</Badge>
                                            </TableCell>
                                            <TableCell className="text-slate-600 truncate max-w-[200px]" title={issue.location}>{issue.location}</TableCell>
                                            <TableCell className="text-slate-600">{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell>{getStatusBadge(issue.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-[200px]">
                                                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="focus:bg-amber-50"
                                                            onClick={() => handleStatusUpdate(issue.id, "Reported")}
                                                            disabled={issue.status === "Reported"}
                                                        >
                                                            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                                                            <span>Mark as Reported</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="focus:bg-blue-50"
                                                            onClick={() => handleStatusUpdate(issue.id, "In Progress")}
                                                            disabled={issue.status === "In Progress"}
                                                        >
                                                            <Clock className="mr-2 h-4 w-4 text-blue-500" />
                                                            <span>Mark as In Progress</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="focus:bg-emerald-50"
                                                            onClick={() => handleStatusUpdate(issue.id, "Resolved")}
                                                            disabled={issue.status === "Resolved"}
                                                        >
                                                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                                                            <span>Mark as Resolved</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-48 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search className="h-8 w-8 text-slate-300 mb-2" />
                                                <p>No complaints match your filters.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </main>
        </div>
    );
}
