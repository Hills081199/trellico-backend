import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { CommentModule } from './comment/comment.module';
import { NotificationModule } from './notification/notification.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { WorkspaceMemberModule } from './workspace-member/workspace-member.module';
import { BoardMemberModule } from './board-member/board-member.module';
import { TagModule } from './tag/tag.module';
import { CardTagModule } from './card-tag/card-tag.module';

@Module({
  imports: [AuthModule, UserModule, ProfileModule, CardModule, BoardModule, ListModule, CommentModule, NotificationModule, WorkspaceModule, WorkspaceMemberModule, BoardMemberModule, TagModule, CardTagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
