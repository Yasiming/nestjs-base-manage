interface JwtUserData {
  user_id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: Permission[];
}
