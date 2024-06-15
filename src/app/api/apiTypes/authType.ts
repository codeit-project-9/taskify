/**에러 메시지의 타입 */
export interface ErrorRes {
  message: string;
}

/** 로그인 Request Body*/
export interface loginReq {
  email: string;
  password: string;
}

/**로그인 Response */
export interface loginRes {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl?: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

/**비밀번호 변경 Request */
export interface ModPassReq {
  password: string;
  newPassword: string;
}
