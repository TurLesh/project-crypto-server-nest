import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { Role } from './roles.model';

// swagger docs block starts here //
@ApiTags('Roles')
// swagger docs block ends here //
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Add new role to DB (create new role)' })
    @ApiResponse({ status: 201, type: Role })
    // swagger docs block ends here //
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Get role data by role name (/:ROLE)' })
    @ApiResponse({ status: 200, type: Role })
    // swagger docs block ends here //
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
