import { UserProfile } from './userProfile';

export class User {
  id?: number;
  email!: string;
  password?: string;
  role!: string;
  userProfile?: UserProfile | null;
}
