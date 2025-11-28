import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        username: string;
        id: string;
        hashedPassword: string;
        role: string;
        employeeId: string | null;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
