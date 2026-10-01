import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task, TaskPriority, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasks: Repository<Task>) {}
  list(userId: string) {
    return this.tasks.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }
  async create(userId: string, dto: CreateTaskDto) {
    const task = this.tasks.create({
      ...dto,
      title: dto.title.trim(),
      description: dto.description?.trim() || null,
      dueDate: dto.dueDate || null,
      priority: dto.priority ?? TaskPriority.MEDIUM,
      status: dto.status ?? TaskStatus.ACTIVE,
      userId,
    });
    const saved = await this.tasks.save(task);
    return this.findOne(userId, saved.id);
  }
  async findOne(userId: string, id: string) {
    const task = await this.tasks.findOneBy({ id, userId });
    if (!task) throw new NotFoundException('Task not found.');
    return task;
  }
  async update(userId: string, id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(userId, id);
    Object.assign(task, dto);
    if (dto.title !== undefined) task.title = dto.title.trim();
    if (dto.description !== undefined) task.description = dto.description?.trim() || null;
    if (dto.dueDate !== undefined) task.dueDate = dto.dueDate || null;
    await this.tasks.save(task);
    return this.findOne(userId, id);
  }
  async remove(userId: string, id: string) {
    const task = await this.findOne(userId, id);
    await this.tasks.remove(task);
    return { success: true };
  }
}
