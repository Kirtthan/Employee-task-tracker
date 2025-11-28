import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(employeeId?: string, status?: string): import(".prisma/client").Prisma.PrismaPromise<({
        employee: {
            id: string;
            role: string;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<({
        employee: {
            id: string;
            role: string;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateTaskDto: UpdateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
