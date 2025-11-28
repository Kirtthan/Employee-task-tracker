import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async getStats() {
    const totalEmployees = await this.prisma.employee.count();
    const totalTasks = await this.prisma.task.count();
    const completedTasks = await this.prisma.task.count({ where: { status: 'DONE' } });

    // Status breakdown
    const todo = await this.prisma.task.count({ where: { status: 'TODO' } });
    const inProgress = await this.prisma.task.count({ where: { status: 'IN_PROGRESS' } });
    const done = await this.prisma.task.count({ where: { status: 'DONE' } });

    return {
      totalEmployees,
      totalTasks,
      completedPercentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      statusBreakdown: {
        TODO: todo,
        IN_PROGRESS: inProgress,
        DONE: done,
      }
    };
  }

  // Placeholder methods to satisfy CRUD if needed, or we can remove them
  create(createDashboardDto: any) { return 'Not implemented'; }
  findAll() { return this.getStats(); }
  findOne(id: number) { return 'Not implemented'; }
  update(id: number, updateDashboardDto: any) { return 'Not implemented'; }
  remove(id: number) { return 'Not implemented'; }
}
