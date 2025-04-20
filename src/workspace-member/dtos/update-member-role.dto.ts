import { IsEmail, IsIn } from 'class-validator';

export class UpdateMemberRoleDto {
  @IsEmail()
  email: string;

  @IsIn(['viewer', 'editor'], {
    message: 'Role must be either viewer or editor',
  })
  role: 'viewer' | 'editor';
}