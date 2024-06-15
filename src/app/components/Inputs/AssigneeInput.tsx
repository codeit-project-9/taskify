'use client';

import React, {
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { INPUT_STYLE, LABLE_INPUT_STYLE, LABLE_STYLE } from './InputStyles';
import { Assignee, OnUpdate, Members } from './InputTypes';
import CustomAvatar from '../CustomAvatar';

interface AssigneeProps {
  assignee: Assignee;
  members: Members;
  onUpdate: OnUpdate;
  controlFocus: {
    isFocused: boolean;
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function AssigneeInput({
  assignee,
  members,
  onUpdate,
  controlFocus,
}: AssigneeProps) {
  const [inputValue, setInputValue] = useState<string>(assignee.nickname);
  const input = useRef<HTMLInputElement>(null);
  const [searchedMembers, setSearchedMembers] = useState<Members>(members);
  const { isFocused, setIsFocused } = controlFocus;

  const clickAssignee = (e: MouseEvent<HTMLButtonElement>) => {
    const selected = members.filter((member) => {
      return String(member.userId) === e.currentTarget.value;
    });
    onUpdate('assignee', selected[0]);
    setInputValue(selected[0].nickname);
    setIsFocused(false);
  };

  const chooseAssignee = () => {
    if (searchedMembers.length === 1) {
      onUpdate('assignee', searchedMembers[0]);
      setInputValue(assignee.nickname);
    } else if (searchedMembers.length === 0) {
      setInputValue('');
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused) {
      setIsFocused(true);
    }
    if (e.key === 'Enter') {
      chooseAssignee();
      e.currentTarget.blur();
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const searched = members.filter((member) => {
      if (!inputValue?.trim()) {
        return true;
      } else {
        return member.nickname.indexOf(inputValue.trim()) !== -1;
      }
    });
    setSearchedMembers(searched);
  }, [inputValue, members]);

  useEffect(() => {
    setInputValue(assignee.nickname);
  }, [assignee]);

  return (
    <div
      className={`${LABLE_INPUT_STYLE} relative max-w-[217px] text-black max-sm:max-w-none`}
    >
      <label htmlFor='assignee' className={LABLE_STYLE}>
        담당자
      </label>
      <div
        className={`${INPUT_STYLE} ${isFocused ? 'border-custom_violet-_5534da' : ''} flex items-center bg-white bg-[url('/images/dropDownArrow.svg')] bg-right bg-no-repeat`}
        onClick={() => {
          input.current?.focus();
        }}
      >
        {!isFocused && inputValue && (
          <div className='mr-[4px] flex flex-shrink-0 items-center justify-center'>
            <CustomAvatar
              profileUrl={assignee.profileImageUrl}
              nickName={assignee.nickname}
            />
          </div>
        )}
        <input
          id='assignee'
          placeholder='이름을 입력해주세요'
          type='text'
          className='no-autofill flex-grow bg-transparent outline-none'
          autoComplete='off'
          onChange={(e) => {
            setInputValue(e.target.value || '');
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={chooseAssignee}
          onKeyDown={onKeyDown}
          value={inputValue}
          ref={input}
        />
      </div>
      {isFocused && (
        <div className='custom-scrollbar absolute top-[83px] max-h-[96px] w-full overflow-y-scroll rounded-sm bg-white text-[16px] max-sm:top-[73px] max-sm:max-h-[84px] max-sm:text-[14px]'>
          {searchedMembers.map((member) => {
            return (
              <button
                key={member.userId * -5}
                value={member.userId}
                type='button'
                className='flex w-full items-center hover:bg-custom_gray-_d9d9d9'
                onClick={clickAssignee}
              >
                <div className='mr-[4px] flex flex-shrink-0 items-center justify-center'>
                  <CustomAvatar
                    profileUrl={member.profileImageUrl}
                    nickName={member.nickname}
                  />
                </div>
                {member.nickname}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
