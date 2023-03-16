import { Injectable } from '@nestjs/common';
import { addToWatchlistDto } from './dto/add-watchlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './wathclist.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import _ = require('lodash');

@Injectable()
export class WatchlistService {
    constructor(@InjectModel(Watchlist) private watchlistRepository: typeof Watchlist) {}
    async getWatchlist(userId: number) {
        const watchlist = await this.watchlistRepository.findByPk(userId);
        if (!watchlist) {
            throw new HttpException('Watchlist for this user not found', HttpStatus.NOT_FOUND);
        }
        return watchlist.items;
    }

    async setWatchlist(addToWatchlistDto: addToWatchlistDto) {
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

    async initWatchlist(addToWatchlistDto: addToWatchlistDto) {
        const userWatchlistCreate = await this.watchlistRepository.create(addToWatchlistDto);
        return userWatchlistCreate;
    }

    async addItemById({ userId, item }) {
        const watchlistObj = await this.watchlistRepository.findByPk(userId);
        if (!watchlistObj) {
            throw new HttpException('Watchlist for this user not found', HttpStatus.NOT_FOUND);
        }
        watchlistObj.items = [...watchlistObj.items, item];
        await watchlistObj.save();
        return watchlistObj;
    }

    async removeItemById({ userId, item }) {
        const watchlistObj = await this.watchlistRepository.findByPk(userId);
        if (!watchlistObj) {
            throw new HttpException('Watchlist for this user not found', HttpStatus.NOT_FOUND);
        }
        watchlistObj.items = _.pull([...watchlistObj.items], item);
        await watchlistObj.save();
        return watchlistObj;
    }
}
