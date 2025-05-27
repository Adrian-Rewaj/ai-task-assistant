import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { Prisma } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException();
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException();
    const task = await this.taskService.findOne(+id, userId);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  async create(@Body() body: { title: string; description: string }, @Req() req: any) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException();
    const data: Prisma.TaskCreateInput = {
      title: body.title,
      description: body.description,
      user: { connect: { id: userId } },
    };
    return this.taskService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Prisma.TaskUpdateInput,
    @Req() req: any,
  ) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException();
    return this.taskService.update(+id, userId, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException();
    return this.taskService.delete(+id, userId);
  }
}
