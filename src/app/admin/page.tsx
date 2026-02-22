import { getIssues } from "@/app/actions";
import AdminClient from "./admin-client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
    const issues = await getIssues();

    return (
        <AdminClient initialIssues={issues} />
    );
}
