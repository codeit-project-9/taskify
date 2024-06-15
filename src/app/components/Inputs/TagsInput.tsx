'use client';

import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { INPUT_STYLE, LABLE_INPUT_STYLE, LABLE_STYLE } from './InputStyles';
import { OnUpdate } from './InputTypes';
import InputTags from '../InputTags';

interface Props {
  onUpdate: OnUpdate;
  initTags?: string[];
}

export default function TagInput({ onUpdate, initTags }: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const tagInput = useRef<HTMLInputElement>(null);

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = inputValue.trim();
      if (input.length === 0) return;
      if (tags.indexOf(input) >= 0) {
        setInputValue('');
        return;
      }
      setTags((prev) => [...prev, input]);
      setInputValue('');
    }
  };

  const onDelTag = (tag: string) => {
    const remainedTags = tags.filter((t) => {
      return t !== tag;
    });
    setTags([...remainedTags]);
  };

  useEffect(() => {
    onUpdate('tags', tags);
  }, [tags, onUpdate]);

  useEffect(() => {
    if (initTags?.length) setTags(initTags);
  }, [initTags]);

  return (
    <div className={LABLE_INPUT_STYLE}>
      <label htmlFor='tags' className={LABLE_STYLE}>
        태그
      </label>
      <div
        onClick={() => tagInput.current?.focus()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`${INPUT_STYLE} ${
          isFocused ? 'border-custom_violet-_5534da' : ''
        } flex h-auto flex-col items-center bg-custom_white max-sm:h-auto`}
      >
        <InputTags tags={tags} onClick={onDelTag} />
        <input
          id='tags'
          placeholder='입력 후 Enter로 추가/태그 클릭시 삭제'
          type='text'
          onChange={(e) => {
            setInputValue(e.target.value || '');
          }}
          value={inputValue}
          onKeyUp={addTag}
          autoComplete='off'
          className={`no-autofill w-[100%] text-black outline-none`}
          ref={tagInput}
        />
      </div>
    </div>
  );
}
