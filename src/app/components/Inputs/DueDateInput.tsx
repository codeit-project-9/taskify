'use client';

import React, { useEffect, useState } from 'react';
import { INPUT_STYLE, LABLE_INPUT_STYLE, LABLE_STYLE } from './InputStyles';
import { OnUpdate } from './InputTypes';

interface Props {
  onUpdate: OnUpdate;
  initDueDate?: string;
}

const removeT = (time: string) => {
  return time.replace('T', ' ');
};

const addT = (time: string) => {
  return time.replace(' ', 'T');
};

export default function DueDateInput({ onUpdate, initDueDate }: Props) {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    onUpdate('dueDate', removeT(inputValue));
  }, [inputValue, onUpdate]);

  useEffect(() => {
    if (initDueDate) setInputValue(addT(initDueDate));
  }, [initDueDate]);

  return (
    <div className={`${LABLE_INPUT_STYLE} text-black`}>
      <label htmlFor='dueDate' className={LABLE_STYLE}>
        마감일
      </label>
      <input
        id='dueDate'
        data-placeholder='날짜를 입력해주세요'
        type='datetime-local'
        onChange={(e) => {
          setInputValue(e.target.value || '');
        }}
        required
        value={addT(inputValue)}
        className={`${INPUT_STYLE} customDate delDate relative flex h-[56px] whitespace-nowrap bg-[url('/images/calender-icon.svg')] bg-[center_left_16px] bg-no-repeat pl-[44px] before:text-custom_gray-_9fa6b2 before:content-[attr(data-placeholder)] valid:before:hidden max-sm:h-[53px] max-sm:pl-[42px]`}
      />
    </div>
  );
}
