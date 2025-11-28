import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        employeeId: string | null;
        hashedPassword: string;
        role: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
