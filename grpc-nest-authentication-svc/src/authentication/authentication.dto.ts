import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthenticationRegisterRequest, AuthenticationLoginRequest, AuthenticationValidateRequest } from './authentication.pb';

export class RegisterRequestDto implements AuthenticationRegisterRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class LoginRequestDto implements AuthenticationLoginRequest {
  @IsString()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class ValidateRequestDto implements AuthenticationValidateRequest {
  @IsString()
  public readonly token: string;
}
