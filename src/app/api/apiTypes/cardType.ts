/** 카드 생성 Request Body*/
export interface CreateCardReq {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

/** 카드 생성 Response*/
export interface CreateCardRes {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl?: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

/**카드 목록 조회 Response */
export interface CheckCardsRes {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

/** 카드 수정 Request Body*/
export interface ModCardReq extends CheckCardsRes {}

/**카드 수정 Response */
export interface ModCardRes extends CreateCardRes {}

/**카드 상세 조회 Response */
export interface CheckCardRes extends CreateCardRes {}
