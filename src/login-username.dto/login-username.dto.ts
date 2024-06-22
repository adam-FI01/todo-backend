import { IsString } from 'class-validator';

export class LoginUsernameDto {
  @IsString()
  username: string;
}