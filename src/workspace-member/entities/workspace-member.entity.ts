import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Workspace } from '../../workspace/entities/workspace.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class WorkspaceMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.members)
  workspace: Workspace;

  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @Column({ type: 'enum', enum: ['owner', 'editor', 'viewer'], default: 'viewer' })
  role: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joined_at: Date;
}
