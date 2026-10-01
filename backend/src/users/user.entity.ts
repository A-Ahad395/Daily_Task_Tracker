import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ length: 100 }) name: string;
  @Column({ unique: true, length: 255 }) email: string;
  @Column({ select: false }) passwordHash: string;
  @CreateDateColumn() createdAt: Date;
  @OneToMany(() => Task, (task) => task.user) tasks: Task[];
}
