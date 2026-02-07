import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/entities/user.entity';

export class UserListItemDto {
    @ApiProperty({ 
        example: '6977d4a8095e952625f1a83f',
        description: 'User ID'
    })
    _id: string;

    @ApiProperty({ 
        example: 'user@example.com',
        description: 'User email address'
    })
    email: string;

    @ApiProperty({ 
        enum: UserRole,
        example: UserRole.USER,
        description: 'User role'
    })
    role: UserRole;

    @ApiProperty({ 
        example: false,
        description: 'Whether the user is soft deleted'
    })
    isDeleted: boolean;

    @ApiProperty({ 
        example: '2026-01-26T20:55:04.354Z',
        description: 'Account creation timestamp'
    })
    createdAt: Date;

    @ApiProperty({ 
        example: '2026-01-26T20:55:04.354Z',
        description: 'Last update timestamp'
    })
    updatedAt: Date;

    @ApiProperty({ 
        example: 'Syful',
        description: 'User name',
        required: false
    })
    name?: string;

    @ApiProperty({ 
        example: 'Software Engineer',
        description: 'User title/position',
        required: false
    })
    title?: string;

    @ApiProperty({ 
        example: 'https://www.imgdb.com/example.png',
        description: 'User profile image URL',
        required: false
    })
    image?: string;
}

export class UserListResponseDto {
    @ApiProperty({ 
        type: [UserListItemDto],
        description: 'Array of users'
    })
    data: UserListItemDto[];

    @ApiProperty({
        example: {
            page: 1,
            limit: 20,
            total: 100,
            totalPages: 5
        },
        description: 'Pagination metadata',
        required: false
    })
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}