import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMember } from '../workspace-member/entities/workspace-member.entity';
import { Not, Repository } from 'typeorm';
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(Workspace)
        private readonly workspaceRepository: Repository<Workspace>,

        @InjectRepository(WorkspaceMember)
        private readonly workspaceMemberRepository: Repository<WorkspaceMember>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createWorkspace(createWorkspaceDto: CreateWorkspaceDto, userReq: User): Promise<Workspace> {
        // Check if the user exists
        const user = await this.userRepository.findOne({
            where: { id: userReq.id },
        });


        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Check if name is already taken
        const existingWorkspace = await this.workspaceRepository.findOne({
            where: { name: createWorkspaceDto.name },
        });
        if (existingWorkspace) {
            throw new  BadRequestException('Workspace name already taken');
        }

        // Create the workspace
        const workspace = this.workspaceRepository.create({
            ...createWorkspaceDto,
            created_by: user.id,
        });
        const savedWorkspace = await this.workspaceRepository.save(workspace);

        // Create the workspace member
        const workspaceMember = this.workspaceMemberRepository.create({
            workspace,
            user,
            role: 'owner',
        });
        await this.workspaceMemberRepository.save(workspaceMember);
        return savedWorkspace;
    }
}
