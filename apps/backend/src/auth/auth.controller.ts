import { Controller, Post, Body, UnauthorizedException, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { User } from '../generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.login(body.email, body.password);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request & { user?: User }) {
    return req.user;
  }
}
