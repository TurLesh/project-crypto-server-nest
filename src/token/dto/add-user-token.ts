import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class AddUserTokenDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 1, description: 'Unique user id' })
    // swagger docs block ends here //
    @IsNumber({}, { message: 'Must be a number' })
    readonly userId: number;

    // swagger docs block starts here //
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlcyI6W3siaWQiOjEsInZhbHVlIjoiQURNSU4iLCJkZXNjcmlwdGlvbiI6IkFkbWluaXN0cmF0b3IiLCJjcmVhdGVkQXQiOiIyMDIzLTAzLTA5VDExOjU3OjE1Ljg5MVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAzLTA5VDExOjU3OjE1Ljg5MVoiLCJVc2VyUm9sZXMiOnsiaWQiOjEsInJvbGVJZCI6MSwidXNlcklkIjoxfX1dLCJpYXQiOjE2Nzg4MTA3ODksImV4cCI6MTY3ODg5NzE4OX0.-G-70Bij6xMTf2XM_s6di5DgxHzgHcyNFVo_kOTmwEo',
        description: 'User`s access token'
    })
    // swagger docs block ends here //
    @IsString({ message: 'Must be a string' })
    readonly token: string;
}

// this classes used only for api docs
export class UserIdDto {
    // swagger docs block starts here //
    @ApiProperty({ example: 1, description: 'Unique user id' })
    // swagger docs block ends here //
    readonly userId: number;
}

export class TokenDto {
    // swagger docs block starts here //
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlcyI6W3siaWQiOjEsInZhbHVlIjoiQURNSU4iLCJkZXNjcmlwdGlvbiI6IkFkbWluaXN0cmF0b3IiLCJjcmVhdGVkQXQiOiIyMDIzLTAzLTA5VDExOjU3OjE1Ljg5MVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAzLTA5VDExOjU3OjE1Ljg5MVoiLCJVc2VyUm9sZXMiOnsiaWQiOjEsInJvbGVJZCI6MSwidXNlcklkIjoxfX1dLCJpYXQiOjE2Nzg4MTA3ODksImV4cCI6MTY3ODg5NzE4OX0.-G-70Bij6xMTf2XM_s6di5DgxHzgHcyNFVo_kOTmwEo',
        description: 'User`s access token'
    })
    // swagger docs block ends here //
    @IsString({ message: 'Must be a string' })
    readonly token: string;
}
