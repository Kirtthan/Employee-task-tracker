import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: {
                username: createUserDto.username,
                hashedPassword,
                role: 'USER', // Default role
            },
        });
    }

    async findOne(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    async update(id: string, updateUserDto: any) {
        // If password is being updated, hash it
        if (updateUserDto.password) {
            updateUserDto.hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
            delete updateUserDto.password;
        }
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }
}
