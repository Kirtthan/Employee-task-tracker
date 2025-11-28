import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalEmployees: number;
        totalTasks: number;
        completedPercentage: number;
        statusBreakdown: {
            TODO: number;
            IN_PROGRESS: number;
            DONE: number;
        };
    }>;
    create(createDashboardDto: any): string;
    findAll(): Promise<{
        totalEmployees: number;
        totalTasks: number;
        completedPercentage: number;
        statusBreakdown: {
            TODO: number;
            IN_PROGRESS: number;
            DONE: number;
        };
    }>;
    findOne(id: number): string;
    update(id: number, updateDashboardDto: any): string;
    remove(id: number): string;
}
