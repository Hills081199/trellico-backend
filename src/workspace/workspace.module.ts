import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { Workspace } from './entities/workspace.entity'; // Import Workspace entity
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMember } from '../workspace-member/entities/workspace-member.entity'; // Import WorkspaceMember entity
import { WorkspaceController } from './workspace.controller';
import { UserModule } from '../user/user.module'; // Import UserModule
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspace, WorkspaceMember]),
    UserModule, // Import UserModule to use User entity,
    AuthModule // Import AuthModule to use SupabaseAuthGuard
  ],
  providers: [WorkspaceService],
  controllers: [WorkspaceController],
  exports: [WorkspaceService, TypeOrmModule.forFeature([Workspace, WorkspaceMember])],
})
export class WorkspaceModule {}
