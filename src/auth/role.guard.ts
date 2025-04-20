import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { WorkspaceMember } from '../workspace-member/entities/workspace-member.entity'; // Import the WorkspaceMember entity
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ROLES_KEY } from '../common/decorators/roles.decorator'; // đúng path

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>, // Inject repository to check role
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) return true; // Nếu không set role thì cho qua

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const workspaceId = request.params.workspaceId || request.params.id;

    if (!user || !workspaceId) {
      throw new ForbiddenException('Missing user or workspace id');
    }

    const member = await this.workspaceMemberRepository.findOne({
      where: {
        user: { id: user.id },
        workspace: { id: workspaceId },
      },
    });
    
    if (!member) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    if (!requiredRoles.includes(member.role)) {
      throw new ForbiddenException(`Your role "${member.role}" is not allowed to perform this action`);
    }

    return true;
  }
}