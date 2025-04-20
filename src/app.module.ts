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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { WorkspaceMember } from './workspace-member/entities/workspace-member.entity';
import { Workspace } from './workspace/entities/workspace.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProfileModule,
    CardModule,
    BoardModule,
    ListModule,
    CommentModule,
    NotificationModule,
    WorkspaceModule,
    WorkspaceMemberModule,
    BoardMemberModule,
    TagModule,
    CardTagModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to PostgreSQL
      host: 'localhost', // PostgreSQL host (adjust if necessary)
      port: 5432, // Default PostgreSQL port
      username: 'admin', // Your PostgreSQL username
      password: '123456', // Your PostgreSQL password
      database: 'trellico-dev', // The name of your PostgreSQL database
      entities: [User, Profile, Workspace, WorkspaceMember], // List your entities here
      synchronize: false, // Set to false in production for safety
    }),
    TypeOrmModule.forFeature([User, Profile, Workspace, WorkspaceMember]), // Add your repository here if needed
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}