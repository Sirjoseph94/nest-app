import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string
}
