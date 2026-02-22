"use server";

import { getPrisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { IssueStatus, Issue } from "@/lib/store";

export async function getIssues() {
    try {
        const issues = await getPrisma().issue.findMany({
            orderBy: { createdAt: "desc" },
        });
        return issues as unknown as Issue[];
    } catch (error) {
        console.error("Failed to fetch issues:", error);
        return [];
    }
}

export async function addIssueAction(data: {
    title: string;
    description: string;
    location: string;
    category: string;
    photoUrl?: string;
}) {
    try {
        const issue = await getPrisma().issue.create({
            data: {
                title: data.title,
                description: data.description,
                location: data.location,
                category: data.category,
                photoUrl: data.photoUrl,
                status: "Reported",
            },
        });

        revalidatePath("/issues");
        revalidatePath("/admin");
        return { success: true, data: issue };
    } catch (error) {
        console.error("Failed to create issue:", error);
        return { success: false, error: "Failed to create issue" };
    }
}

export async function updateIssueStatusAction(id: string, status: IssueStatus) {
    try {
        const issue = await getPrisma().issue.update({
            where: { id },
            data: { status },
        });

        revalidatePath("/issues");
        revalidatePath("/admin");
        return { success: true, data: issue };
    } catch (error) {
        console.error("Failed to update status:", error);
        return { success: false, error: "Failed to update status" };
    }
}
