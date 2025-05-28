import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    return task;
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(
    id: number,
    userId: number,
    data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    // Sprawdź, czy task należy do usera
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, userId: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new ForbiddenException('Not authorized');

    return this.prisma.task.delete({ where: { id } });
  }
}
