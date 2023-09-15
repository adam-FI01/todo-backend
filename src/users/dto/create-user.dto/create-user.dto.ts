// users/dto/create-user.dto.ts
import { IsAlphanumeric, IsNotEmpty, IsString, Length, Matches } from "class-validator";
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 255)
  @IsAlphanumeric()
  password: string;
}
