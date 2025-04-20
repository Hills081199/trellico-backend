import { Controller, Post, UseGuards, Body, Req, Param } from '@nestjs/common';
import { Request } from 'express'; // Bây giờ đã được mở rộng
import { SupabaseAuthGuard } from '../auth/auth.guard'; // Adjust the path as necessary
import { CreateWorkspaceDto } from './dtos/create-workspace.dto';
import { WorkspaceService } from './workspace.service';

import { User } from '../user/entities/user.entity';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from '../common/decorators/roles.decorator'; // Import the Roles decorator

@Controller('workspace')
export class WorkspaceController {
    constructor(private readonly workspaceService: WorkspaceService) {}

    @Post()
    @UseGuards(SupabaseAuthGuard)
    create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req: Request) {
        const userReq = req.user as User;
        return this.workspaceService.createWorkspace(createWorkspaceDto, userReq);
    }

    
}
