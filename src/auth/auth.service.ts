import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { WatchlistService } from 'src/watchlist/watchlist.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
        private watchlistService: WatchlistService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);
        const userIdAndToken = {
            userId: user.id,
            token: token
        };
        await this.tokenService.setToken(userIdAndToken);
        const watchlist = await this.watchlistService.getWatchlist(user.id);
        return {
            token: token,
            user: {
                id: user.id,
                email: user.email
            },
            watchlist: watchlist
        };
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('This email is already in use', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        const token = await this.generateToken(user);
        const userIdAndToken = {
            userId: user.id,
            token: token
        };
        await this.tokenService.setToken(userIdAndToken);
        const watchlistInitObj = {
            userId: user.id,
            items: []
        };
        await this.watchlistService.initWatchlist(watchlistInitObj);
        return {
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        };
    }

    async check(token: string) {
        try {
            await this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException({ message: 'Token expired' });
        }
        const candidateId = await this.tokenService.getUserIdbyToken(token);
        const user = await this.userService.getUserById(candidateId);
        if (!user) {
            throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        const token = this.jwtService.sign(payload);
        return token;
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) {
            throw new HttpException('User with this email not found', HttpStatus.NOT_FOUND);
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Incorrect email address or password' });
    }
}
