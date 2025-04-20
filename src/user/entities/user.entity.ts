// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { WorkspaceMember } from 'src/workspace-member/entities/workspace-member.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.user)
  workspaces: WorkspaceMember[];
}
