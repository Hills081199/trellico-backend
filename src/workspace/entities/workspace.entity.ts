import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WorkspaceMember } from '../../workspace-member/entities/workspace-member.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.workspace)
  members: WorkspaceMember[];
}