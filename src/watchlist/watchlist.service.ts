import { Injectable } from '@nestjs/common';
import { addToWatchlistDto } from './dto/add-watchlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './wathclist.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private watchlistRepository: typeof Watchlist) {}
    async getWatchlist(userId: number) {
        const watchlist = await this.watchlistRepository.findByPk(userId);
        if (!watchlist) {
            throw new HttpException('Watchlist for this user not found', HttpStatus.NOT_FOUND);
        }
        return watchlist;
    }

    async addToWatchlist(addToWatchlistDto: addToWatchlistDto) {
        const userWatchlist = await this.watchlistRepository.findByPk(addToWatchlistDto.userId);
        if (userWatchlist) {
            userWatchlist.items = addToWatchlistDto.items;
            await userWatchlist.save();
            return userWatchlist;
        } else {
            const userWatchlistCreate = await this.watchlistRepository.create(addToWatchlistDto);
            return userWatchlistCreate;
        }
    }
}
