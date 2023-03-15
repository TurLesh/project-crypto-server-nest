import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { TokenService } from './token.service';
import { AddUserTokenDto, UserIdDto, TokenDto } from './dto/add-user-token';
import { Token } from './token.model';

// swagger docs block starts here //
@ApiTags('Token')
// swagger docs block ends here //
@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService) {}

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Get user id by token' })
    @ApiResponse({ status: 201, type: UserIdDto, description: 'UserId successfully returned' })
    @ApiResponse({ status: 400, description: 'token must be a string' })
    @ApiResponse({ status: 404, description: 'User with this token not found' })
    // swagger docs block ends here //
    @Post('/get-id')
    getUserIdByToken(@Body() tokenObj: TokenDto) {
        return this.tokenService.getUserIdbyToken(tokenObj.token);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Save user`s token to db' })
    @ApiResponse({ status: 201, type: Token, description: 'The record has been successfully created' })
    @ApiResponse({ status: 400, description: 'userId must be a number; token must be a string' })
    // swagger docs block ends here //
    @Post('/set')
    setToken(@Body() addUserTokenDto: AddUserTokenDto) {
        return this.tokenService.setToken(addUserTokenDto);
    }
}
