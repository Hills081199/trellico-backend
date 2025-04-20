import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  constructor(
    private readonly userService: UserService, // Assuming you have a UserService to handle user creation
  ) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new InternalServerErrorException(
        'Supabase environment variables are not defined',
      );
    }
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getUserFromToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return data.user;
  }

  async register(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw new BadRequestException('Error signing up user', error.message);
    }
    const supabaseUser = data.user;
    try{
      const username = email.split('@')[0];
      const user = await this.userService.create({
        id: supabaseUser.id,
        email: supabaseUser.email,
        username: username,
      });

      return {
        message:
          'Registration successful. Please check your email to confirm your account.',
        user,
      };
    }
    catch (error) {
      throw new InternalServerErrorException(
        'Error creating user in the database',
      );
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      message: 'Login successful',
      user: data.user,
      access_token: data.session?.access_token,
    };
  }

  async logout(token: string) {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new UnauthorizedException('Logout failed');
    }
    return { message: 'Logout successful' };
  }
}
