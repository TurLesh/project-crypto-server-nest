import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { AddUserTokenDto } from './dto/add-user-token';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class TokenService {
    constructor(@InjectModel(Token) private tokenRepository: typeof Token) {}

    async getUserIdbyToken(token: string) {
        const user = await this.tokenRepository.findOne({ where: { token }, include: { all: true } });
        if (!user) {
            throw new HttpException('User with this token not found', HttpStatus.NOT_FOUND);
        }
        return user.userId;
    }

    async setToken(addUserTokenDto: AddUserTokenDto) {
        const user = await this.tokenRepository.findByPk(addUserTokenDto.userId);
        if (user) {
            user.token = addUserTokenDto.token;
            await user.save();
            return user;
        } else {
            const userCreate = await this.tokenRepository.create(addUserTokenDto);
            return userCreate;
        }
    }
}
