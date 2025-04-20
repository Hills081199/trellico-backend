import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkspaceInfoDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}