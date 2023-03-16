import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { WatchlistModule } from 'src/watchlist/watchlist.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({ secret: process.env.PRIVATE_KEY || 'SECRET', signOptions: { expiresIn: '24h' } }),
        TokenModule,
        WatchlistModule
    ],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
