import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './authentication.dto';
import { AuthenticationRegisterResponse, AUTHENTICATION_SERVICE_NAME, AuthenticationLoginResponse, AuthenticationRegisterRequest, AuthenticationLoginRequest, AuthenticationValidateResponse } from './authentication.pb';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  @Inject(AuthenticationService)
  private readonly service: AuthenticationService;

  @GrpcMethod(AUTHENTICATION_SERVICE_NAME, 'AuthenticationRegister')
  private authenticationRegister(payload: RegisterRequestDto): Promise<AuthenticationRegisterResponse> {
    return this.service.register(payload);
  }

  @GrpcMethod(AUTHENTICATION_SERVICE_NAME, 'AuthenticationLogin')
  private authenticationLogin(payload: LoginRequestDto): Promise<AuthenticationLoginResponse> {
    return this.service.login(payload);
  }

  @GrpcMethod(AUTHENTICATION_SERVICE_NAME, 'AuthenticationValidate')
  private authenticationValidate(payload: ValidateRequestDto): Promise<AuthenticationValidateResponse> {
    return this.service.validate(payload);
  }

}