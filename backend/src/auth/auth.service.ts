import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwt: JwtService,
  ) {}

  private response(user: User) {
    return {
      token: this.jwt.sign({ sub: user.id }),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    if (await this.users.exist({ where: { email } }))
      throw new ConflictException('An account with this email already exists.');
    const user = this.users.create({
      name: dto.name.trim(),
      email,
      passwordHash: await hash(dto.password, 12),
    });
    try {
      await this.users.save(user);
    } catch (error: unknown) {
      if ((error as { code?: string }).code === '23505')
        throw new ConflictException('An account with this email already exists.');
      throw error;
    }
    return this.response(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: dto.email.trim().toLowerCase() })
      .getOne();
    if (!user || !(await compare(dto.password, user.passwordHash)))
      throw new UnauthorizedException('Invalid email or password.');
    return this.response(user);
  }
}
