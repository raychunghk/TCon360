import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    // Return a dummy user object
    return { username: 'dummyUser', id: 1 };
  }
}