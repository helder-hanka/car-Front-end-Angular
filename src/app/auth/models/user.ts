import { UserRole } from './userRole';
export class User {
  email!: string;
  password!: string;
  confirmPassword?: string;
  role!: UserRole;
}
