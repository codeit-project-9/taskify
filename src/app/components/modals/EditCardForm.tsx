'use client';
import { useCallback, useEffect, useState } from 'react';
import AssigneeInput from '../Inputs/AssigneeInput';
import TitleInput from '../Inputs/TitleInput';
import DescriptionInput from '../Inputs/DescriptionInput';
import DueDateInput from '../Inputs/DueDateInput';
import TagInput from '../Inputs/TagsInput';
import ImageInput from '../Inputs/ImageInput';
import { Assignee, Datas, Members, State } from '../Inputs/InputTypes';
import axios from '@/app/api/axios';
import { Button } from '../ui/button';
import StateInput from '../Inputs/StateInput';

interface ModalProps {
  columnId: number;
  dashboardId: string | number;
  loginToken: string;
  cardId: number | string;
  closeModal: () => void;
  setIsCardChange: any;
}

const BUTTON_STYLE =
  'flex h-[48px] w-[120px] items-center justify-center font-medium max-sm:h-[42px] max-sm:flex-grow max-sm:text-[14px]';
const MODAL_TITLE_STYLE =
  'w-full text-[24px] font-bold text-custom_black-_333236';

const EditCardForm = ({
  columnId,
  dashboardId,
  loginToken,
  cardId,
  closeModal,
  setIsCardChange,
}: ModalProps) => {
  const [datas, setDatas] = useState<Datas>({
    assignee: {
      userId: 0,
      nickname: '',
    },
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: '',
    columnId: 0,
  });
  const [isAssigneeFocused, setIsAssigneeFocused] = useState<boolean>(false);
  const [isStateFocused, setIsStateFocused] = useState<boolean>(false);
  const [members, setMembers] = useState<Members>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [initDatas, setInitDatas] = useState<Datas>();
  const [states, setStates] = useState<State[]>([]);

  const getMembers = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/members?size=409&dashboardId=${dashboardId}`,
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      const { members } = data;
      setMembers(members);
    } catch (err) {
      console.log(err);
    }
  }, [dashboardId, loginToken]);

  const getCardDatas = useCallback(async () => {
    try {
      const { data } = await axios.get(`/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      const {
        title,
        description,
        dueDate,
        tags,
        imageUrl,
        assignee,
        columnId,
      } = data;
      const cardData = {
        title,
        description,
        dueDate,
        tags,
        imageUrl,
        assignee,
        columnId,
      };
      setDatas(cardData);
      setInitDatas(cardData);
    } catch (err) {
      console.log(err);
    }
  }, [cardId, loginToken]);

  const getStates = useCallback(async () => {
    try {
      const { data } = await axios.get(`/columns?dashboardId=${dashboardId}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      const { data: states } = data;
      setStates(states);
    } catch (err) {
      console.log(err);
    }
  }, [dashboardId, loginToken]);

  const editCard = async () => {
    const postBody = {
      assigneeUserId: datas.assignee.userId,
      columnId: datas.columnId,
      title: datas.title,
      description: datas.description,
      dueDate: datas.dueDate,
      tags: datas.tags,
      imageUrl: datas.imageUrl,
    };
    try {
      const res = await axios.put(`/cards/${cardId}`, postBody, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      closeModal();
    } catch (err) {
      console.log(err);
      alert('미안하지만 카드 수정은 실패다');
    } finally {
      setIsCardChange(true);
    }
  };

  const setData = useCallback(
    (data: { [key: string]: string | Assignee | string[] | number }) => {
      setDatas((prev) => {
        return { ...prev, ...data };
      });
    },
    [],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      getMembers();
      getCardDatas();
      getStates();
    }
  }, [isMounted, getMembers, getCardDatas, getStates]);

  if (!isMounted) return;
  return (
    <div
      className='max-sm:mb=[-8px] custom-scrollbar mb-[-4px] mr-[-4px] flex max-h-[calc(100vh-100px)] w-[calc(100vw-96px)] max-w-[458px] flex-col gap-y-[16px] overflow-y-scroll bg-white pr-[4px] max-sm:mr-[-8px] max-sm:mt-[8px]'
      onClick={() => {
        setIsAssigneeFocused(false);
        setIsStateFocused(false);
      }}
    >
      <h2 className={MODAL_TITLE_STYLE}>할 일 수정</h2>
      <div className='flex gap-[16px] max-sm:flex-col'>
        <StateInput
          states={states}
          columnId={columnId}
          setData={setData}
          controlFocus={{
            isFocused: isStateFocused,
            setIsFocused: setIsStateFocused,
          }}
        />
        <AssigneeInput
          assignee={datas.assignee}
          members={members}
          setData={setData}
          controlFocus={{
            isFocused: isAssigneeFocused,
            setIsFocused: setIsAssigneeFocused,
          }}
        />
      </div>
      <TitleInput setData={setData} initTitle={datas.title} />
      <DescriptionInput setData={setData} initDescription={datas.description} />
      <DueDateInput setData={setData} initDueDate={datas.dueDate} />
      <TagInput setData={setData} initTags={datas.tags} />
      <ImageInput
        setData={setData}
        columnId={columnId}
        initImageUrl={datas.imageUrl}
        loginToken={loginToken}
      />
      <div className='flex flex-row-reverse gap-x-[12px]'>
        <Button
          onClick={editCard}
          type='button'
          disabled={
            datas.assignee === initDatas?.assignee &&
            datas.columnId === initDatas.columnId &&
            datas.description === initDatas.description &&
            datas.dueDate === initDatas.dueDate &&
            datas.imageUrl === initDatas.imageUrl &&
            datas.tags.length === initDatas.tags.length &&
            datas.tags.every((v, i) => v === initDatas.tags[i]) &&
            datas.title === initDatas.title
          }
          className={`${BUTTON_STYLE} bg-custom_violet-_5534da text-custom_white hover:bg-[#4423c8] disabled:bg-custom_gray-_9fa6b2`}
        >
          수정
        </Button>
        <Button
          onClick={closeModal}
          type='button'
          className={`${BUTTON_STYLE} border border-solid border-custom_gray-_d9d9d9 bg-custom_white text-custom_gray-_787486 hover:text-custom_white`}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default EditCardForm;
