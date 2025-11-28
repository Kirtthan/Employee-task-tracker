import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    }>;
    findOne(username: string): Promise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    } | null>;
    findById(id: string): Promise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    } | null>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    }[]>;
    update(id: string, updateUserDto: any): Promise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
