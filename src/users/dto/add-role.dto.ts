import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class AddRoleDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 'USER', description: 'Role unique name' })
    // swagger docs block ends here //
    @IsString({ message: 'Must be a string' })
    readonly value: string;
    // swagger docs block starts here //
    @ApiProperty({ example: 2, description: 'Unique user id' })
    // swagger docs block ends here //
    @IsNumber({}, { message: 'Must be a number' })
    readonly userId: number;
}
