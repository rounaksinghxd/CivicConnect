export type IssueStatus = "Reported" | "In Progress" | "Resolved";

export interface Issue {
    id: string;
    title: string;
    description: string;
    location: string;
    photoUrl?: string | null;
    status: IssueStatus;
    category: string;
    createdAt: Date;
}

export type Category = "Pothole" | "Streetlight" | "Trash" | "Graffiti" | "Other";

export const CATEGORIES: Category[] = ["Pothole", "Streetlight", "Trash", "Graffiti", "Other"];

// Mock DB
let issues: Issue[] = [
    {
        id: "1",
        title: "Large Pothole on Main St",
        description: "There's a massive pothole in the right lane going south.",
        location: "Main St & 4th Ave",
        photoUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
        status: "Reported",
        category: "Pothole",
        createdAt: new Date("2024-03-20T10:00:00")
    },
    {
        id: "2",
        title: "Broken Streetlight",
        description: "Streetlight has been out for a week.",
        location: "Oak St & Elm St",
        status: "In Progress",
        category: "Streetlight",
        createdAt: new Date("2024-03-18T18:30:00")
    }
];

export const getIssues = () => issues;

export const addIssue = (issue: Omit<Issue, "id" | "status" | "createdAt">) => {
    const newIssue: Issue = {
        ...issue,
        id: Math.random().toString(36).substr(2, 9),
        status: "Reported",
        createdAt: new Date()
    };
    issues = [newIssue, ...issues];
    return newIssue;
};

export const updateIssueStatus = (id: string, status: IssueStatus) => {
    issues = issues.map(issue =>
        issue.id === id ? { ...issue, status } : issue
    );
};
