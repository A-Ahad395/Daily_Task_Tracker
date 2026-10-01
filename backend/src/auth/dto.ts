import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Matches(/\S/, { message: 'Name cannot be blank.' })
  name: string;
  @IsEmail() @MaxLength(255) email: string;
  @IsString() @MinLength(8) @MaxLength(128) password: string;
}

export class LoginDto {
  @IsEmail() email: string;
  @IsString() password: string;
}
