import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export enum TaskStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

@Entity('tasks')
@Index(['userId', 'createdAt'])
export class Task {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ length: 160 }) title: string;
  @Column({ type: 'text', nullable: true }) description: string | null;
  @Column({ type: 'date', nullable: true }) dueDate: string | null;
  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ACTIVE }) status: TaskStatus;
  @Column('uuid') userId: string;
  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
