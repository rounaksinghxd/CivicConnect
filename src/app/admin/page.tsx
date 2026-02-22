import { getIssues } from "@/app/actions";
import AdminClient from "./admin-client";
import AdminGuard from "@/components/admin-guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
    const issues = await getIssues();

    return (
        <AdminGuard>
            <AdminClient initialIssues={issues} />
        </AdminGuard>
    );
}
