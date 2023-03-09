import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNumber } from 'class-validator';

export class BanUserDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 2, description: 'Unique user id' })
    // swagger docs block ends here //
    @IsNumber({}, { message: 'Must be a number' })
    readonly userId: number;
    // swagger docs block starts here //
    @ApiProperty({ example: 'Suspected of a phishing attempt', description: 'Ban reason' })
    // swagger docs block ends here //
    readonly banReason: string;
}
