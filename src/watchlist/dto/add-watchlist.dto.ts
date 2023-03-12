import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumber, IsArray, IsString } from 'class-validator';

export class addToWatchlistDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 1, description: 'Unique user id' })
    // swagger docs block ends here //
    @IsNumber({}, { message: 'Must be a number' })
    readonly userId: number;

    // swagger docs block starts here //
    @ApiProperty({ example: ['bitcoin', 'ethereum', 'litecoin', 'dot'], description: 'Array of items in watchlist' })
    // swagger docs block ends here //
    @IsArray({ message: 'Must be an array' })
    @IsString({ each: true, message: 'Array items must be strings' })
    readonly items: string[];
}
