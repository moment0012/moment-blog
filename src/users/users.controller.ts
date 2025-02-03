import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() createUserDto: User) {
        try {
            const user = await this.usersService.create(createUserDto);
            return {
                message: 'User registered successfully',
                userId: user.id,
                username: user.username,
            }
        } catch (error) {
            return {
                message: "User registration failed",
                error: error.message
            }
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
