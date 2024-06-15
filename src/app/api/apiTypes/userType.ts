/**회원가입 Request*/
export interface SignUpReq {
  email: string;
  nickname: string;
  password: string;
}

/**회원가입 Response*/
export interface SignUpRes {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**내 정보 조회 Response */
export interface CheckUserRes extends SignUpRes {}

/**내 정부 수정 Request */
export interface ModUserReq {
  nickname: string;
  profileImageUrl?: string;
}

/**내 정부 수정 Response */
export interface ModUserRes extends SignUpRes {}

/**프로필이미지 업로드 Res&Req */
export interface UploadProfileImage {
  profileImageUrl: string;
}
