import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(body: any) {
    const payload = {
      email: body.email,
      name: body.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(body: any) {
    const payload = {
      email: body.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}