import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddMemberDto } from './dtos/add-member.dto';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity'; // Adjust the path as needed
import { Workspace } from '../workspace/entities/workspace.entity'; // Adjust the path as needed
import { WorkspaceMember } from '../workspace-member/entities/workspace-member.entity'; // Adjust the path as needed

@Injectable()
export class WorkspaceMemberService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Workspace)
        private readonly workspaceRepository: Repository<Workspace>,
        @InjectRepository(WorkspaceMember)
        private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
    ){}

    async addMember(workspaceId: string, addMemberDto: AddMemberDto) {
        const { email, role } = addMemberDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const workspace = await this.workspaceRepository.findOne({
            where: { id: workspaceId },
        });
        if (!workspace) {
            throw new NotFoundException(`Workspace not found`);
        }

        const existingMember = await this.workspaceMemberRepository.findOne({
            where: {
            workspace: { id: workspaceId },
            user: { id: user.id },
            },
            relations: ['user', 'workspace'],
        });

        if (existingMember) {
            throw new ConflictException('User is already a member of this workspace');
        }

        const member = this.workspaceMemberRepository.create({
            workspace,
            user,
            role,
        });

        return await this.workspaceMemberRepository.save(member);
    }

    async updateMemberRole(workspaceId: string, email: string, role: 'viewer' | 'editor') {
        if (!['viewer', 'editor'].includes(role)) {
          throw new BadRequestException('Invalid role. Only "viewer" or "editor" allowed');
        }
      
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
          throw new NotFoundException(`User with email ${email} not found`);
        }
      
        const member = await this.workspaceMemberRepository.findOne({
          where: {
            workspace: { id: workspaceId },
            user: { id: user.id },
          },
          relations: ['workspace', 'user'],
        });
      
        if (!member) {
          throw new NotFoundException('Member not found in this workspace');
        }
      
        if (member.role === 'owner') {
          throw new BadRequestException('Cannot change role of owner');
        }
      
        member.role = role;
        return this.workspaceMemberRepository.save(member);
      
    }


    async deleteMember(workspaceId: string, email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new NotFoundException(`User with email ${email} not found`);
      
        const member = await this.workspaceMemberRepository.findOne({
          where: {
            user: { id: user.id },
            workspace: { id: workspaceId },
          },
        });
      
        if (!member) {
          throw new NotFoundException(`User is not a member of this workspace`);
        }
      
        if (member.role === 'owner') {
          throw new ConflictException('Cannot remove owner from the workspace');
        }
      
        await this.workspaceMemberRepository.remove(member);
        return { message: 'Member removed successfully' };
    }

}
