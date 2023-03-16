import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { addToWatchlistDto } from './dto/add-watchlist.dto';
import { WatchlistService } from './watchlist.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { Watchlist } from './wathclist.model';

interface IOneItemActions {
    userId: number;
    item: string;
}

// swagger docs block starts here //
@ApiTags('Watchlist')
// swagger docs block ends here //
@Controller('watchlist')
export class WatchlistController {
    constructor(private watchlistService: WatchlistService) {}

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Get watchlist data by unique user id (/:userId)' })
    @ApiResponse({ status: 200, type: Watchlist })
    // swagger docs block ends here //
    @Get('/:userId')
    getWatchlist(@Param('userId') userId: number) {
        return this.watchlistService.getWatchlist(userId);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Set watchlist data by unique user id' })
    @ApiResponse({ status: 201, type: Watchlist })
    // swagger docs block ends here //
    @Post('/set')
    setWatchlist(@Body() addToWatchlistDto: addToWatchlistDto) {
        return this.watchlistService.setWatchlist(addToWatchlistDto);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Add one item to user`s watchlist by userId and item name' })
    @ApiResponse({ status: 201 })
    // swagger docs block ends here //
    @Post('/add-item')
    addItemById(@Body() addItemObj: IOneItemActions) {
        return this.watchlistService.addItemById(addItemObj);
    }

    // swagger docs block starts here //
    @ApiOperation({ summary: 'Remove one item from user`s watchlist by userId and item name' })
    @ApiResponse({ status: 201 })
    // swagger docs block ends here //
    @Post('/remove-item')
    removeItemById(@Body() removeItemObj: IOneItemActions) {
        return this.watchlistService.removeItemById(removeItemObj);
    }
}
