import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
  @IsOptional({ message: 'Name is required' })
  name: string;
}

export class CodeAuthDto {
  @IsNotEmpty({ message: 'Id is required' })
  _id: string;
  @IsNotEmpty({ message: 'Code is required' })
  code: string;
}
