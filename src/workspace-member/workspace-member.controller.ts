import { Controller, UseGuards, Post, Put, Param, Body, Req, Delete } from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service'; // Adjust the path as needed
import { AddMemberDto } from './dtos/add-member.dto'; // Adjust the path as needed
import { RoleGuard } from '../auth/role.guard'; // Adjust the path as needed
import { Roles } from '../common/decorators/roles.decorator'; // Adjust the path as needed
import { SupabaseAuthGuard } from '../auth/auth.guard'; // Adjust the path as needed

@Controller('workspace-member')
export class WorkspaceMemberController {
    constructor(private readonly workspaceMemberService: WorkspaceMemberService) {}

    @Post(':workspaceId/members')
    @UseGuards(SupabaseAuthGuard, RoleGuard)
    @Roles('owner')
    async addMember(
        @Param('workspaceId') workspaceId: string,
        @Body() addMemberDto: AddMemberDto,
    ){
        return this.workspaceMemberService.addMember(workspaceId, addMemberDto);
    }

    @Put(':workspaceId/members/role')
    @UseGuards(SupabaseAuthGuard, RoleGuard)
    @Roles('owner')
    async updateMemberRole(
        @Param('workspaceId') workspaceId: string,
        @Body('email') email: string,
        @Body('role') role: 'viewer' | 'editor',
    ) {
        return this.workspaceMemberService.updateMemberRole(workspaceId, email, role);
    }

    @Delete(':workspaceId/members')
    @UseGuards(SupabaseAuthGuard, RoleGuard)
    @Roles('owner')
    removeMember(
        @Param('workspaceId') workspaceId: string,
        @Body('email') email: string,
    ) {
        return this.workspaceMemberService.deleteMember(workspaceId, email);
    }
}
