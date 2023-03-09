import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
    // swagger docs block ends here //
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Incorrect email address' })
    readonly email: string;

    // swagger docs block starts here //
    @ApiProperty({ example: 'password123', description: 'Password' })
    // swagger docs block ends here //
    @IsString({ message: 'Password must be a string' })
    @Length(6, 20, { message: 'Password length must be of 6-20' })
    readonly password: string;
}
