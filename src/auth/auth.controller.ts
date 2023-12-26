import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.signUp(username, password);
  }

  @Post('signin')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.signIn(username, password);
  }

  @UseGuards(AuthGuard)
  @Delete('remove')
  async remove(@Request() req) {
    return await this.authService.remove(req.user.username);
  }
}
