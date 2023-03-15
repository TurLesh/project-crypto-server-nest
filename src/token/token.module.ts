import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';

@Module({
    providers: [TokenService],
    controllers: [TokenController],
    imports: [SequelizeModule.forFeature([Token])],
    exports: [TokenService]
})
export class TokenModule {}
