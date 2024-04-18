import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  password: string;
}
