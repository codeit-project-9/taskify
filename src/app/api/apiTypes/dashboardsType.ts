/**대시보드 생성 Request */
export interface CreateDashReq {
  title: string;
  color: string;
}

/**대시보드 생성 Response */
export interface CreateDashRes {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/**대시보드 목록 조회 Response */
export interface CheckDashsRes {
  cursorId: number;
  totalCount: number;
  dashboards: {
    id: number;
    title: string;
    color: string;
    createdAt: string;
    updatedAt: string;
    createdByMe: boolean;
    userId: number;
  }[];
}

/**대시보드 조회 Request */
export interface CheckDashRes {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/**대시보드 수정 Request */
export interface ModDashReq {
  title: string;
  color: string;
}

/**대시보드 수정 Request */
export interface ModDashRes extends CheckDashRes {}

/**대시보드 초대하기 Request */
export interface InviteDashReq {
  email: string;
}

/**대시보드 초대하기 Response */
export interface InviteDashRes {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**대시보드 초대 불러오기 Response*/
export interface LoadInvitationsRes {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
