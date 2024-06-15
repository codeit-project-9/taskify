/**댓글 생성 Request */
export interface CreateCommentReq {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

/**댓글 생성 Response */
export interface CreateCommentRes {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

/**댓글 목록 조회 Response */
export interface CheckCommentsRes {
  cursorId: number;
  comments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    author: {
      profileImageUrl?: string;
      nickname: string;
      id: number;
    };
  }[];
}

/**댓글 수정 Request */
export interface ModCommentReq {
  content: string;
}

/**댓글 수정 Response */
export interface ModCommentRes extends CreateCommentRes {}
