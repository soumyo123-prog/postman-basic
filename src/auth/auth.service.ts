import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAuthToken(user: User) {
    return this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });
  }

  async signUp(username: string, password: string) {
    if (!username || !password) {
      throw new HttpException(
        'Please enter a valid username and password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = this.userService.findOne(username);
    if (existingUser) {
      throw new HttpException(
        `User with username: ${username} already exists`,
        HttpStatus.FORBIDDEN,
      );
    }

    const user = this.userService.createUser(username, password);
    const token = await this.generateAuthToken(user);
    return {
      user: user.toObject(),
      token: token,
    };
  }

  async signIn(username: string, password: string) {
    const user = this.userService.findOne(username);
    if (!user) {
      throw new HttpException(
        `User with username: ${username} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.password !== password) {
      throw new HttpException(
        `Please enter correct password`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.generateAuthToken(user);
    return {
      user: user.toObject(),
      token: token,
    };
  }

  async remove(username: string) {
    const user = this.userService.findOne(username);
    if (!user) {
      throw new HttpException(`User does not exist`, HttpStatus.NOT_FOUND);
    }

    this.userService.removeUser(username);
    return user.toObject();
  }
}
