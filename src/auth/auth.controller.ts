import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from 'src/decorators/swagger.decorator';
import { AuthDto } from './dto/auth-dto';

@ApiTags('Authorization')
@Controller('auth')
@GlobalResponseSwagger()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: 'Authentication route' })
    @ApiBody({ type: AuthDto })
    async login(@Req() req:any) {
        return this.authService.login(req.user)
    }
}
