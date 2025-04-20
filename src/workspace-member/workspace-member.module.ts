import { Module } from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { WorkspaceMemberController } from './workspace-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { WorkspaceMember } from './entities/workspace-member.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace, WorkspaceMember, User]), AuthModule], // Add your entities here if needed
  providers: [WorkspaceMemberService],
  controllers: [WorkspaceMemberController]
})
export class WorkspaceMemberModule {}
