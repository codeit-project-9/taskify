/**컬럼 생성 Request Body*/
export interface CreateColumnsReq {
  title: string;
  dashboardId: number;
}

/**컬럼 생성 Response*/
export interface CreateColumnsRes {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

/**컬럼 조회 Response*/
export interface CheckColumnsRes {
  result: string;
  data: {
    id: number;
    title: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

/**컬럼 수정 Request*/
export interface ModColumnsReq {
  title: string;
}

/**컬럼 수정 Response*/
export interface ModColumnsRes extends CreateColumnsRes {}

/**카드 이미지 업로드 Request&Response*/
export interface uploadCardImage {
  imageUrl: string;
}
