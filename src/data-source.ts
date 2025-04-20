// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Workspace } from './workspace/entities/workspace.entity';
import { WorkspaceMember } from './workspace-member/entities/workspace-member.entity';
import { Profile } from './profile/entities/profile.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'data.db', // Path to your SQLite database file
  entities: [User, Profile, Workspace, WorkspaceMember], // All entities you want to sync
  synchronize: true, // Automatically create the database schema, optional for migrations
  logging: true,
});

export default dataSource;
