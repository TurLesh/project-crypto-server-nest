import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { addToWatchlistDto } from './dto/add-watchlist.dto';
import { WatchlistService } from './watchlist.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { Watchlist } from './wathclist.model';

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
    addToWatchlist(@Body() addToWatchlistDto: addToWatchlistDto) {
        return this.watchlistService.addToWatchlist(addToWatchlistDto);
    }
}
