import { Module } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchlistController } from './watchlist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Watchlist } from './wathclist.model';

@Module({
    providers: [WatchlistService],
    controllers: [WatchlistController],
    imports: [SequelizeModule.forFeature([Watchlist])],
    exports: [WatchlistService]
})
export class WatchlistModule {}
