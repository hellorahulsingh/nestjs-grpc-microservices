import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthenticationServiceClient, AUTHENTICATION_SERVICE_NAME, AuthenticationRegisterRequest, AuthenticationRegisterResponse, AuthenticationLoginRequest, AuthenticationLoginResponse } from './authentication.pb';

@Controller('auth')
export class AuthenticationController implements OnModuleInit {
  private svc: AuthenticationServiceClient;

  @Inject(AUTHENTICATION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthenticationServiceClient>(AUTHENTICATION_SERVICE_NAME);
  }

  @Post('register')
  private async authenticationRegister(@Body() body: AuthenticationRegisterRequest): Promise<Observable<AuthenticationRegisterResponse>> {
    return this.svc.authenticationRegister(body);
  }

  @Post('login')
  private async authenticationLogin(@Body() body: AuthenticationLoginRequest): Promise<Observable<AuthenticationLoginResponse>> {
    return this.svc.authenticationLogin(body);
  }

}