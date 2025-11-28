"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const totalEmployees = await this.prisma.employee.count();
        const totalTasks = await this.prisma.task.count();
        const completedTasks = await this.prisma.task.count({ where: { status: 'DONE' } });
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
    create(createDashboardDto) { return 'Not implemented'; }
    findAll() { return this.getStats(); }
    findOne(id) { return 'Not implemented'; }
    update(id, updateDashboardDto) { return 'Not implemented'; }
    remove(id) { return 'Not implemented'; }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map