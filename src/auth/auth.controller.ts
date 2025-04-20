import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email and password are required');
    }
    // Validate email format
    const { email, password } = body;
    return this.authService.register(email, password);
  }

  @Post('login')
   async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException('Email and password are required');
    }
    // Validate email format
    const { email, password } = body;
    return this.authService.login(email, password);
   }

   @Post('logout')
   async logout(@Headers('Authorization') token: string) {
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }
    // Bearer token format, so we strip 'Bearer ' part
    const user = await this.authService.getUserFromToken(token.replace('Bearer ', ''));
    return this.authService.logout(user.id);
   }


//   @Get('profile')
//   async getProfile(@Headers('Authorization') token: string) {
//     if (!token) {
//       throw new UnauthorizedException('Authorization token is missing');
//     }
//     // Bearer token format, so we strip 'Bearer ' part
//     const user = await this.authService.getUserFromToken(token.replace('Bearer ', ''));
//     return { user };
//   }
}