export type Assignee = {
  id?: number;
  userId: number;
  email?: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  isOwner?: boolean;
};

export interface State {
  id: number;
  title: string;
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Datas {
  assignee: Assignee;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
  columnId?: number;
}

export type Members = {
  id?: number;
  userId: number;
  email?: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  isOwner?: boolean;
}[];

export type OnUpdate = <T extends keyof Datas>(key: T, value: Datas[T]) => void;
