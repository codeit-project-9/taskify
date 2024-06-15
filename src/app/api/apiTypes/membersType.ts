/**대시보드 멤버 목록 조회 */
export interface CheckMembersRes {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}
