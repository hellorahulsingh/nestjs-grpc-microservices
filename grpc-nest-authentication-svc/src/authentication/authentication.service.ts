import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './authentication.dto';
import { AuthenticationLoginResponse, AuthenticationRegisterResponse, AuthenticationValidateResponse } from './authentication.pb';
import { Auth } from './entity/auth.entity';
import { JwtService } from './service/jwt.service';

@Injectable()
export class AuthenticationService {
  @InjectRepository(Auth)
  private readonly repository: Repository<Auth>;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  public async register({ email, password }: RegisterRequestDto): Promise<AuthenticationRegisterResponse> {
    let auth: Auth = await this.repository.findOne({ where: { email } });

    if (auth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    auth = new Auth();

    auth.email = email;
    // auth.password = password;
    auth.password = this.jwtService.encodePassword(password);

    await this.repository.save(auth);

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({ email, password }: LoginRequestDto): Promise<AuthenticationLoginResponse> {
    const auth: Auth = await this.repository.findOne({ where: { email } });

    if (!auth) {
      return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);
    // const isPasswordValid: boolean = password === auth.password;

    if (!isPasswordValid) {
      return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({ token }: ValidateRequestDto): Promise<AuthenticationValidateResponse> {
    // if (!token) {
    //   return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    // }
    // return { status: HttpStatus.OK, error: null, userId: Number(token) };

    const decoded: Auth = await this.jwtService.verify(token);

    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    }

    const auth: Auth = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };

  }

}