import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationValidateResponse } from './authentication.pb';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthenticationService)
  public readonly service: AuthenticationService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {

    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req['headers']['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const { status, userId }: AuthenticationValidateResponse = await this.service.validate(authorization);

    req['user'] = userId;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}