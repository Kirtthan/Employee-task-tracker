import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    }>;
    findOne(username: string): Promise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    } | null>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    }[]>;
    update(id: string, updateUserDto: any): Promise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
