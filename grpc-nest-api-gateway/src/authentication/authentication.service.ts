import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthenticationServiceClient, AuthenticationValidateResponse, AUTHENTICATION_SERVICE_NAME } from './authentication.pb';

@Injectable()
export class AuthenticationService {
  private svc: AuthenticationServiceClient;

  @Inject(AUTHENTICATION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthenticationServiceClient>(AUTHENTICATION_SERVICE_NAME);
  }

  public async validate(token: string): Promise<AuthenticationValidateResponse> {
    return firstValueFrom(this.svc.authenticationValidate({ token }));
  }
}