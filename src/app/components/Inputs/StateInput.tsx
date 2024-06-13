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
import { SetData, State } from './InputTypes';

interface StateProps {
  columnId: number;
  setData: SetData;
  states: State[];
  controlFocus: {
    isFocused: boolean;
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function StateInput({
  columnId,
  setData,
  states,
  controlFocus,
}: StateProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const input = useRef<HTMLInputElement>(null);
  const [searchedStates, setSearchedStates] = useState<State[]>(states);
  const { isFocused, setIsFocused } = controlFocus;

  const clickState = (e: MouseEvent<HTMLButtonElement>) => {
    const selected = states.filter(
      (state) => state.title === e.currentTarget.value,
    );
    setData({ columnId: selected[0]?.id });
    setInputValue(selected[0]?.title);
    setIsFocused(false);
  };

  const chooseState = () => {
    if (searchedStates.length === 1) {
      setData({ columnId: searchedStates[0].id });
      setInputValue(searchedStates[0].title);
    } else {
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
        return state.title.indexOf(inputValue.trim()) !== -1;
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
      onClick={(e) => e.stopPropagation()}
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
        <input
          id='state'
          placeholder='상태를 입력해주세요'
          type='text'
          className='no-autofill flex-grow bg-transparent outline-none'
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
        <div className='absolute top-[83px] max-h-[96px] w-full overflow-y-scroll rounded-sm bg-white text-[16px] max-sm:top-[73px] max-sm:max-h-[84px] max-sm:text-[14px]'>
          {states.map((state) => {
            return (
              <button
                value={state.title}
                key={state.id}
                type='button'
                className='flex items-center'
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
