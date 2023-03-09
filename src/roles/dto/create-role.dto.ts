import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateRoleDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 'USER', description: 'Role unique name' })
    // swagger docs block ends here //
    readonly value: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 'Regular user', description: 'Role description' })
    // swagger docs block ends here //
    readonly description: string;
}
