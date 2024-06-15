'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LABLE_INPUT_STYLE, LABLE_STYLE } from './InputStyles';
import { OnUpdate } from './InputTypes';
import Image from 'next/image';
import axios from '@/app/api/axios';

interface Props {
  onUpdate: OnUpdate;
  columnId: number;
  initImageUrl?: string;
  loginToken: string;
}

export default function ImageInput({
  onUpdate,
  columnId,
  initImageUrl,
  loginToken,
}: Props) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const image = useRef<HTMLInputElement>(null);

  const setImage = async () => {
    const formData = new FormData();
    const imgFile = image.current?.files;
    if (imgFile) {
      formData.append('image', imgFile[0]);
    }
    try {
      const { data } = await axios.post(
        `/columns/${columnId}/card-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${loginToken}`,
          },
        },
      );
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onUpdate('imageUrl', imageUrl);
  }, [imageUrl, onUpdate]);

  useEffect(() => {
    if (initImageUrl) setImageUrl(initImageUrl);
  }, [initImageUrl]);

  return (
    <div className={`${LABLE_INPUT_STYLE} relative`}>
      <label htmlFor='image' className={LABLE_STYLE}>
        이미지
      </label>
      <input
        id='image'
        type='file'
        accept='image/*'
        className={`z-10 w-[76px] text-transparent file:h-[76px] file:w-[76px] file:cursor-pointer file:rounded-md file:border-none ${imageUrl ? 'file:bg-transparent file:bg-none' : 'file:bg-[#f5f5f5] file:bg-[url("/images/add-card-icon.svg")]'} file:bg-[length:28px_28px] file:bg-center file:bg-no-repeat file:text-transparent`}
        onChange={() => {
          setImage();
        }}
        ref={image}
      />
      {imageUrl && (
        <div className='absolute top-[35px] h-[76px] w-[76px] cursor-pointer overflow-hidden rounded-md'>
          <Image src={imageUrl} fill alt='' sizes='30vw' />
        </div>
      )}
    </div>
  );
}
