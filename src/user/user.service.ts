import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  private generateUserId() {
    return this.users.length;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  createUser(username: string, password: string) {
    const userId = this.generateUserId();
    const user = new User(userId, username, password);
    this.users.push(user);
    return user;
  }

  removeUser(username: string) {
    this.users = this.users.filter((user) => user.username !== username);
  }
}
