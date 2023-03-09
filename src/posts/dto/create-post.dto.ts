import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsNumber } from 'class-validator';

export class CreatePostDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 'Cryptocurrency news today.', description: 'Post title' })
    // swagger docs block ends here //
    @IsString({ message: 'Must be a string' })
    readonly title: string;
    // swagger docs block starts here //
    @ApiProperty({ example: 'BTC falls below 20k.', description: 'Post content' })
    // swagger docs block ends here //
    @IsString({ message: 'Must be a string' })
    readonly content: string;
    // swagger docs block starts here //
    @ApiProperty({ example: 2, description: 'Unique id' })
    // swagger docs block ends here //
    @IsNumber({}, { message: 'Must be a number' })
    readonly userId: number;
}
