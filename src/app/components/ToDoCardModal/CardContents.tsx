import Image from 'next/image';
const tagPink = 'bg-[#f7dbf0] text-[#d549b6]';
const tagBrown = 'bg-[#f9eee3] text-[#d58d49]';
const tagBlue = 'bg-[#dbe6f7] text-[#4981d5]';
const tagGreen = 'bg-[#e7f7db] text-[#86d549]';
const colors = [tagBlue, tagGreen, tagPink, tagBrown];

const CardContents = ({
  imageUrl,
  description,
  tags,
  columntitle,
}: {
  imageUrl?: string;
  description: string;
  tags: string[];
  columntitle: string;
}) => {
  return (
    <>
      <div className='flex items-center gap-[20px] max-sm:gap-[12px]'>
        {/* 태그 */}
        <div className='flex gap-[6px] rounded-xl bg-[#F1EFFD] px-[8px] py-[4px]'>
          <img
            className='w-[6px]'
            src='/images/Ellipse-puple.svg'
            alt='꾸미는 점'
          />
          <span className='max-w-[125px] overflow-hidden overflow-ellipsis text-[12px] text-[#5534DA] max-sm:text-[10px]'>
            {columntitle}
          </span>
        </div>
        <img src='/images/Vector.svg' className='h-[20px]' alt='구분선' />
        <div className='flex flex-wrap overflow-x-hidden'>
          {tags.map((tag: any, index: number) => {
            const colorSelector = tag.length % 4;
            const selecetedColor = colors[colorSelector];
            return (
              <div
                className={`${selecetedColor} my-[3px] mr-[6px] rounded bg-[#F9EEE3] px-[6px] py-[4px] text-[12px] max-sm:text-[10px]`}
                key={index}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>

      {/* 카드 컨텐츠(설명, 이미지) */}
      <div className='mb-[8px]'>
        <div className='mb-[16px] w-full whitespace-pre-wrap break-words text-[14px] leading-[24px]'>
          {description}
        </div>
        {imageUrl && (
          <div className='relative h-[260px] w-full'>
            <Image
              fill
              src={imageUrl}
              alt='카드 이미지'
              className='rounded-md object-cover'
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CardContents;
