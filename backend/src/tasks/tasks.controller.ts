import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';

type AuthRequest = Request & { user: { id: string } };

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService) {}
  @Get() list(@Req() req: AuthRequest) {
    return this.tasks.list(req.user.id);
  }
  @Get(':id') get(@Req() req: AuthRequest, @Param('id', ParseUUIDPipe) id: string) {
    return this.tasks.findOne(req.user.id, id);
  }
  @Post() create(@Req() req: AuthRequest, @Body() dto: CreateTaskDto) {
    return this.tasks.create(req.user.id, dto);
  }
  @Patch(':id') update(
    @Req() req: AuthRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasks.update(req.user.id, id, dto);
  }
  @Delete(':id') remove(@Req() req: AuthRequest, @Param('id', ParseUUIDPipe) id: string) {
    return this.tasks.remove(req.user.id, id);
  }
}
