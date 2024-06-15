import axios from 'axios';
import instance from '@/app/api/axios';

const getDashBoard = async () => {
  try {
    const res = await instance.get('dashboards', {
      params: { navigationMethod: 'pagination' },
    });
  } catch (error) {
    console.log(error);
  }
};

const getColumnsByDashBoardId = async (dashboardid: number) => {
  try {
    const res = await instance.get(`columns`, {
      params: { dashboardId: `${dashboardid}` },
    });
    return await res.data;
  } catch (error) {
    console.error(error);
  }
};

const getCardsByColumnId = async (columId: number, size?: number) => {
  const res = await instance.get(`cards`, {
    params: { columnId: `${columId}`, size: `${size}` },
  });
  return res.data;
};

const getCommentsByCardId = async (cardId: number, size: number = 10) => {
  const res = await instance.get(`comments`, {
    params: { cardId: `${cardId}`, size: `${size}` },
  });
  return res.data;
};

const getCardsList = async (
  columnId: number,
  size: number,
  cursorId: number,
) => {
  const params = {
    columnId: `${columnId}`,
    size: `${size}`,
    cursorId: `${cursorId}`,
  };

  try {
    const res = await instance.get('cards', { params });
  } catch (error) {
    console.log(error);
  }
};

const deleteColumnByID = async (columnId: number, setIsColumnChange: any) => {
  try {
    const res = await instance.delete(`columns/${columnId}`);
  } catch (error) {
    console.log(error);
  } finally {
    setIsColumnChange(true);
  }
};

const deleteComment = async (commentId: number, setIsCommentChange: any) => {
  try {
    const res = await instance.delete(`comments/${commentId}`);
  } catch (error) {
    console.log(error);
  } finally {
    console.log();
    setIsCommentChange(true);
  }
};

const dateFormat = (type: string, date: Date) => {
  if (type === 'format1') {
    let dateFormat1 =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 9
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
    return dateFormat1;
  } else {
    let dateFormat2 =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 9
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      ' ' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      ':' +
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return dateFormat2;
  }
};

const deleteCard = async (cardId: number) => {
  try {
    const res = await instance.delete(`cards/${cardId}`);
  } catch (error) {
    console.log(error);
  }
};

const putColumnByID = async (
  columnId: number,
  title: string,
  setIsColumnChange: any,
) => {
  const data = { title: title };
  try {
    const res = await instance.put(`columns/${columnId}`, data);
  } catch (error) {
    console.log(axios.isAxiosError(error));
  } finally {
    setIsColumnChange(true);
  }
};

const postComment = async (
  content: string,
  cardId: number,
  columnId: number,
  dashboardId: number,
  setIsCommentChange: any,
) => {
  const data = {
    content: content,
    cardId: cardId,
    columnId: columnId,
    dashboardId: dashboardId,
  };
  try {
    const res = await instance.post('comments', data);
  } catch (err) {
    console.log(err);
  } finally {
    setIsCommentChange(true);
  }
};

const putComment = async (
  commentId: number,
  content: string,
  setIsCommentChange: any,
) => {
  const data = { content: content };
  try {
    const res = await instance.put(`comments/${commentId}`, data);
  } catch (error) {
    console.error(error);
  } finally {
    setIsCommentChange(true);
  }
};

const getMyUserData = async () => {
  try {
    const res = await instance.get('users/me');
  } catch (error) {
    console.error(error);
  }
};

export {
  getDashBoard,
  getMyUserData,
  getColumnsByDashBoardId,
  getCardsList,
  deleteColumnByID,
  putColumnByID,
  getCardsByColumnId,
  getCommentsByCardId,
  postComment,
  putComment,
  deleteComment,
  deleteCard,
  dateFormat,
};
