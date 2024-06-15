/**내가 받은 초대 목록 조회 Response */
export interface CheckInvitationsRes {
  cursorId: number;
  invitations: {
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
  }[];
}

/**초대 응답 Request */
export interface AnswerInvitationsReq {
  inviteAccepted: boolean;
}

/**초대 응답 Response */
export interface AnswerInvitationsRes {
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
