import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    refreshToken: string;

    @ApiProperty({ 
        example: { 
            _id: '507f1f77bcf86cd799439011',
            email: 'user@example.com',
            role: 'user'
        } 
    })
    user: {
        _id: string;
        email: string;
        role: string;
    };
}