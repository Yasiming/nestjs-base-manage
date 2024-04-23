export class UserInfo {
  create_time: string;
  update_time: string;
  user_id: string;
  user_name: string;
  nick_name: string;
  is_frozen: boolean;
  avatar: string;
  email: string;
  phone: string;
  roles: string[];
  permissions: string[];
}

export class LoginUserVo {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
}
