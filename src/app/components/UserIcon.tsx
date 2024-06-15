import { CheckMembersRes } from '../api/apiTypes/membersType';

const UserIcon = ({ member }: { member: CheckMembersRes }) => {
  return (
    <div className='relative z-10'>
      <div className='h-[34px] w-[34px] rounded-full border-2 border-white bg-red-500 text-white'>
        <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
          {member.nickname[0]}
        </p>
      </div>
    </div>
  );
};

export default UserIcon;
