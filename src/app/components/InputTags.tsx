import InputTag from './InputTag';

export default function InputTags({
  tags,
  onClick,
}: {
  tags: string[];
  onClick: (tag: string) => void;
}) {
  return (
    <div className='flex max-w-[100%] flex-wrap gap-x-[8px] gap-y-[5px] self-start'>
      {tags.map((tag) => {
        return <InputTag tag={tag} key={tag} onClick={onClick} />;
      })}
    </div>
  );
}
