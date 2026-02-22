import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const getPrisma = (): PrismaClient => {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({
            log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
        });
    }
    return globalForPrisma.prisma;
};

if (process.env.NODE_ENV !== "production") {
    // This executes at module scope, but we do NOT call getPrisma() here automatically
    // to avoid throwing errors in edge/turbopack SSG configs.
}
