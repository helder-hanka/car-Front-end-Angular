import { User } from './user';

export class UserProfile {
  id?: number;
  firstName!: string;
  lastName!: string;
  user!: User;
}
