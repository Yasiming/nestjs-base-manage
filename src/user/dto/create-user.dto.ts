import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nick_name: string;
}
