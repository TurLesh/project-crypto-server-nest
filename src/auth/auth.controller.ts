import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { TokenDto } from 'src/token/dto/add-user-token';
import { User } from 'src/users/users.model';

// swagger docs block starts here //
@ApiTags('Auth')
// swagger docs block ends here //
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Log In / Sign In' })
    @ApiResponse({ status: 201 })
    // swagger docs block ends here //
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Registration / Sign Up' })
    @ApiResponse({ status: 201 })
    // swagger docs block ends here //
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Get user by token' })
    @ApiResponse({ status: 200, type: User, description: 'Token found -> user data successfully returned' })
    @ApiResponse({ status: 400, description: 'token must be a string' })
    @ApiResponse({ status: 401, description: 'Token expired' })
    @ApiResponse({ status: 404, description: 'User with this token not found' })
    // swagger docs block ends here //
    @Post('/check')
    check(@Body() tokenObj: TokenDto) {
        return this.authService.check(tokenObj.token);
    }
}
