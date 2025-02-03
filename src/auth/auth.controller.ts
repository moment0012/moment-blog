import { Body, Get, Controller, Post, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('gihub')
    @UseGuards(AuthGuard('github'))
    async githubLogin() {
        //Github 登陆重定向
    }

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    async githubCallback(@Req() req) {
        // 登陆成功，返回用户信息
        return {
            message: 'Login successful',
            user: req.user
        };
    }

    @Post('login')
    async login(@Body() loginDto: { username: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            // return { message: 'Invalid credentials' };
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = await this.authService.login(user);
        return {
            message: "Login successful",
            access_token: token.access_token,
        }
    }
}
