const tagPink = 'bg-[#f7dbf0] text-[#d549b6]';
const tagBrown = 'bg-[#f9eee3] text-[#d58d49]';
const tagBlue = 'bg-[#dbe6f7] text-[#4981d5]';
const tagGreen = 'bg-[#e7f7db] text-[#86d549]';
const colors = [tagBlue, tagGreen, tagPink, tagBrown];

export default function InputTag({
  tag,
  onClick,
}: {
  tag: string;
  onClick: (tag: string) => void;
}) {
  const colorSelector = tag.length % 4;
  const selecetedColor = colors[colorSelector];
  return (
    <div
      className={`${selecetedColor} flex h-[22px] cursor-pointer flex-wrap rounded-sm px-[6px] py-[4px] text-[12px] leading-[14px]`}
      onClick={() => onClick(tag)}
    >
      {tag}
    </div>
  );
}
