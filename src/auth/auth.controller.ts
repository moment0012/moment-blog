import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

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
