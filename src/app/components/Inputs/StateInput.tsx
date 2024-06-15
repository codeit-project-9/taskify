'use client';

import React, {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { INPUT_STYLE, LABLE_INPUT_STYLE, LABLE_STYLE } from './InputStyles';
import { OnUpdate, State } from './InputTypes';

interface StateProps {
  columnId: number;
  onUpdate: OnUpdate;
  states: State[];
  controlFocus: {
    isFocused: boolean;
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function StateInput({
  columnId,
  onUpdate,
  states,
  controlFocus,
}: StateProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const input = useRef<HTMLInputElement>(null);
  const [searchedStates, setSearchedStates] = useState<State[]>(states);
  const { isFocused, setIsFocused } = controlFocus;

  const clickState = (e: MouseEvent<HTMLButtonElement>) => {
    const selected = states.filter((state) => {
      return String(state.id) === e.currentTarget.value;
    });
    onUpdate('columnId', selected[0]?.id);
    setInputValue(selected[0]?.title);
    setIsFocused(false);
  };

  const chooseState = () => {
    if (searchedStates.length === 1) {
      onUpdate('columnId', searchedStates[0].id);
      setInputValue(searchedStates[0].title);
    } else if (searchedStates.length === 0) {
      setInputValue('');
    }
  };

  //칼럼 타이틀 받기.
  const getInitState = useCallback(() => {
    const initState = states.filter((state) => {
      return state.id === columnId;
    });
    if (initState.length === 0) return;
    setInputValue(initState[0].title);
  }, [columnId, states]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isFocused) setIsFocused(true);
    if (e.key === 'Enter') {
      chooseState();
      e.currentTarget.blur();
    }
  };

  useEffect(() => {
    const searched = states.filter((state) => {
      if (!inputValue?.trim()) {
        return true;
      } else {
        return (
          state.title.toUpperCase().indexOf(inputValue.trim().toUpperCase()) !==
          -1
        );
      }
    });
    setSearchedStates(searched);
  }, [inputValue, states]);

  useEffect(() => {
    getInitState();
  }, [getInitState]);

  return (
    <div
      className={`${LABLE_INPUT_STYLE} relative max-w-[217px] text-black max-sm:w-auto max-sm:max-w-none`}
    >
      <label htmlFor='state' className={LABLE_STYLE}>
        상태
      </label>
      <div
        className={`${INPUT_STYLE} ${isFocused ? 'border-custom_violet-_5534da' : ''} flex items-center bg-white bg-[url('/images/dropDownArrow.svg')] bg-right bg-no-repeat`}
        onClick={() => {
          input.current?.focus();
        }}
      >
        {!isFocused && searchedStates[0]?.title === inputValue && (
          <div className='flex flex-shrink-0 items-center rounded-[11px] bg-custom_violet-_8 px-[8px] py-[4px] text-[12px] text-custom_violet-_5534da before:mr-[6px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-custom_violet-_5534da before:content-[""]'>
            {inputValue}
          </div>
        )}
        <input
          id='state'
          placeholder='상태를 입력해주세요'
          type='text'
          className={`no-autofill flex-grow bg-transparent outline-none ${!isFocused && searchedStates[0]?.title === inputValue && 'text-transparent'}`}
          autoComplete='off'
          onChange={(e) => {
            setInputValue(e.target.value || '');
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          required
          onBlur={chooseState}
          onKeyDown={onKeyDown}
          value={inputValue}
          ref={input}
        />
      </div>

      {/* states뿌리기, states는 column타이들로. */}
      {isFocused && (
        <div className='custom-scrollbar absolute top-[83px] max-h-[96px] w-full overflow-y-scroll rounded-sm bg-white text-[16px] max-sm:top-[73px] max-sm:max-h-[84px] max-sm:text-[14px]'>
          {searchedStates.map((state) => {
            return (
              <button
                key={state.title}
                value={state.id}
                type='button'
                className='flex w-full items-center hover:bg-custom_gray-_d9d9d9'
                onClick={clickState}
              >
                {state.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
