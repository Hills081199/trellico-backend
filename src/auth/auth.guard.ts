import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service'; // Adjust the path as necessary
import { Request } from 'express'; // Import Request from express

// Extend the Request interface to include the user property
declare module 'express' {
  export interface Request {
    user?: any;
  }
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing'); // No token provided
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token missing'); // No token provided
    }

    try {
      const user = await this.authService.getUserFromToken(token);
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token : ', error); // Invalid token
    }
  }
}
