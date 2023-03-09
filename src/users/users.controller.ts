import { Controller, Get, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
// import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

// swagger docs block starts here //
@ApiTags('Users')
// swagger docs block ends here //

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, type: User })
    // swagger docs block ends here //
    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    // swagger docs block ends here //
    @Roles('ADMIN') //////////////////// Define that only user with role ADMIN can access this endpoint
    @UseGuards(JwtAuthGuard, RolesGuard) ////////////////// DELETE JwtAuthGuard TO REMOVE AUTHORIZED REQUIREMENT
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Give role' })
    @ApiResponse({ status: 201, type: AddRoleDto })
    // swagger docs block ends here //
    @Roles('ADMIN') //////////////////// Define that only user with role ADMIN can access this endpoint
    @UseGuards(JwtAuthGuard, RolesGuard) ////////////////// DELETE JwtAuthGuard TO REMOVE AUTHORIZED REQUIREMENT
    // @UsePipes(ValidationPipe)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Ban user' })
    @ApiResponse({ status: 201, type: User })
    // swagger docs block ends here //
    @Roles('ADMIN') //////////////////// Define that only user with role ADMIN can access this endpoint
    @UseGuards(JwtAuthGuard, RolesGuard) ////////////////// DELETE JwtAuthGuard TO REMOVE AUTHORIZED REQUIREMENT
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
