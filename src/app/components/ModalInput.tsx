import { ChangeEvent } from 'react';

/* ex)
  <ModalInput
    labelName='이름'
    inputId='title'
    placeFolder={title}
    value={value}
    setValue={setValue}
  />
 */

const ModalInput = ({
  labelName,
  inputId,
  placeFolder,
  value,
  setValue,
  errorMessage,
  setErrorMessage,
}: {
  labelName: string;
  inputId: string;
  placeFolder?: string;
  value: string;
  setValue: any;
  errorMessage?: string;
  setErrorMessage?: any;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newvalue = e.target.value;
    setValue(newvalue);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const inputStyle = errorMessage
    ? `${baseInputStyle} border border-red-600`
    : baseInputStyle;

  return (
    <div className='mt-[32px]'>
      <label
        htmlFor={inputId}
        className='text-[18px] text-custom_black-_333236'
      >
        {labelName}
      </label>
      <input
        id={inputId}
        value={value}
        className={inputStyle}
        onChange={handleChange}
        placeholder={placeFolder}
      />
      <span className='mt-[8px] text-[14px] text-red-600'>{errorMessage}</span>
    </div>
  );
};

const baseInputStyle =
  'mt-[10px] w-full rounded-md border border-custom_gray-_d9d9d9 px-4 py-4';

export default ModalInput;
