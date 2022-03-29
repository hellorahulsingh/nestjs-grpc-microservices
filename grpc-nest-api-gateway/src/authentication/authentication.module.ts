import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthenticationController } from './authentication.controller';
import { AUTHENTICATION_SERVICE_NAME, AUTHENTICATION_PACKAGE_NAME } from './authentication.pb';
import { AuthenticationService } from './authentication.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: AUTHENTICATION_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/authentication.proto',
        },
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthModule {}