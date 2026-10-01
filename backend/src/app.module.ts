import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Task],
      synchronize: process.env.NODE_ENV !== 'production',
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : false,
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
