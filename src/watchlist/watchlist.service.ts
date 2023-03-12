import { Injectable } from '@nestjs/common';
import { addToWatchlistDto } from './dto/add-watchlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './wathclist.model';

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private watchlistRepository: typeof Watchlist) {}
    async getWatchlist(userId: number) {
        const role = await this.watchlistRepository.findByPk(userId);
        return role;
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
