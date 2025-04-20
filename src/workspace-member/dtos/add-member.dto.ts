import { IsEmail, IsIn } from 'class-validator';

export class AddMemberDto {
  @IsEmail()
  email: string;

  @IsIn(['editor', 'viewer'], { message: 'Role must be either editor or viewer' })
  role: 'editor' | 'viewer';
}