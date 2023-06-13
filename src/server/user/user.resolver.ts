import { Query, Resolver,   } from 'type-graphql';
import { User } from './user.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users() {
    // Implement your logic to fetch users from a database or other data source
    return [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane.doe@example.com' },
    ];
  }
}