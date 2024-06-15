interface IconSize {
  small: string;
  large: string;
}

const iconSize: IconSize = {
  small: '[20px]',
  large: '[22px]',
};

export default function ChipAddIcon({ size }: { size: 'small' | 'large' }) {
  return (
    <div
      className={`w-${iconSize[size]} h-${iconSize[size]} rounded bg-[#F1EFFD] p-[3px]`}
    >
      <img src='/images/add-card-icon.svg' />
    </div>
  );
}
