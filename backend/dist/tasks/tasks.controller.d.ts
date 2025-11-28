import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): import(".prisma/client").Prisma.Prisma__TaskClient<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(req: any, employeeId?: string, status?: string): never[] | import(".prisma/client").Prisma.PrismaPromise<({
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
    findOne(req: any, id: string): Promise<{
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
    }>;
    update(req: any, id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        status: string;
    }>;
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
