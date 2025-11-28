import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
}
