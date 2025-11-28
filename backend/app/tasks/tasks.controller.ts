import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, ForbiddenException, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @Roles('ADMIN')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Request() req, @Query('employeeId') employeeId?: string, @Query('status') status?: string) {
    const user = req.user;

    if (user.role !== 'ADMIN') {
      if (!user.employeeId) {
        // If regular user has no linked employee profile, they see nothing
        return [];
      }
      return this.tasksService.findAll(user.employeeId, status);
    }

    return this.tasksService.findAll(employeeId, status);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (req.user.role !== 'ADMIN' && task.employeeId !== req.user.employeeId) {
      throw new ForbiddenException('You do not have permission to view this task');
    }
    return task;
  }

  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    // Allow ADMIN to do anything
    if (req.user.role === 'ADMIN') {
      return this.tasksService.update(id, updateTaskDto);
    }

    // Allow User to update status ONLY if it's their task
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.employeeId !== req.user.employeeId) {
      throw new ForbiddenException('You do not have permission to update this task');
    }

    // If user is not admin, ensure they are ONLY updating status, not reassigning
    if (updateTaskDto.employeeId && updateTaskDto.employeeId !== task.employeeId) {
      throw new ForbiddenException('You cannot reassign tasks');
    }

    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
