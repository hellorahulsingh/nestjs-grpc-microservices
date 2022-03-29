/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'authentication';

export interface AuthenticationRegisterRequest {
  email: string;
  password: string;
}

export interface AuthenticationRegisterResponse {
  status: number;
  error: string[];
}

export interface AuthenticationLoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationLoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface AuthenticationValidateRequest {
  token: string;
}

export interface AuthenticationValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTHENTICATION_PACKAGE_NAME = 'authentication';

export interface AuthenticationServiceClient {
  authenticationRegister(
    request: AuthenticationRegisterRequest,
  ): Observable<AuthenticationRegisterResponse>;

  authenticationLogin(
    request: AuthenticationLoginRequest,
  ): Observable<AuthenticationLoginResponse>;

  authenticationValidate(
    request: AuthenticationValidateRequest,
  ): Observable<AuthenticationValidateResponse>;
}

export interface AuthenticationServiceController {
  authenticationRegister(
    request: AuthenticationRegisterRequest,
  ):
    | Promise<AuthenticationRegisterResponse>
    | Observable<AuthenticationRegisterResponse>
    | AuthenticationRegisterResponse;

  authenticationLogin(
    request: AuthenticationLoginRequest,
  ):
    | Promise<AuthenticationLoginResponse>
    | Observable<AuthenticationLoginResponse>
    | AuthenticationLoginResponse;

  authenticationValidate(
    request: AuthenticationValidateRequest,
  ):
    | Promise<AuthenticationValidateResponse>
    | Observable<AuthenticationValidateResponse>
    | AuthenticationValidateResponse;
}

export function AuthenticationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'authenticationRegister',
      'authenticationLogin',
      'authenticationValidate',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthenticationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('AuthenticationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTHENTICATION_SERVICE_NAME = 'AuthenticationService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
