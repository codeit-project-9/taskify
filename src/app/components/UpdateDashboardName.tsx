import Image from 'next/image';
import { useEffect, useState } from 'react';
import instance from '../api/axios';
import { useParams } from 'next/navigation';
import { useDashboardData } from '@/context/DashboardDataContext';

const UpdateDashboardName = ({ dashboardid }: { dashboardid: number }) => {
  const params = useParams();
  const { dashboardsData, setDashboardsData } = useDashboardData();

  const [selectedColor, setSelectedColor] = useState<string>('#7ac555');
  const [dashboardName, setDashboardName] = useState<string>('');
  const [title, setTitle] = useState<string | null>(null);
  const colors = [
    { name: '#7ac555', bgColor: 'bg-custom_green-_7ac555' },
    { name: '#760dde', bgColor: 'bg-custom_purple' },
    { name: '#ffa500', bgColor: 'bg-custom_orange' },
    { name: '#76a6ea', bgColor: 'bg-custom_blue' },
    { name: '#e876ea', bgColor: 'bg-custom_pink' },
  ];
  /** 컬러 저장 */
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };
  /** 입력값 저장 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardName(e.target.value);
  };
  /** 대시보드 수정 파라미터 */
  const requestData = {
    title: dashboardName,
    color: selectedColor,
  };

  /** 대시보드 수정 함수 */
  const onClick = async () => {
    try {
      const response = await instance.put(
        `dashboards/${dashboardid}`,
        requestData,
      );
      console.log('POST 요청 성공:', response.data);
      setTitle(response.data.title);
      setDashboardName('');
      setDashboardsData((prevDashboardsData) =>
        prevDashboardsData.map((dashboard) =>
          parseInt(dashboard.id) == dashboardid
            ? {
                ...dashboard,
                title: response.data.title,
                color: response.data.color,
              }
            : dashboard,
        ),
      );
    } catch (e) {
      alert('대시보드 수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await instance.get(`dashboards/${params.dashboardid}`);
        setTitle(res.data.title);
        setDashboardName('');
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, [params.dashboardid, dashboardsData]);

  return (
    <div className='m-5 w-[620px] rounded-lg bg-custom_white px-[28px] py-8 max-xl:w-auto max-xl:max-w-[620px] max-sm:mx-3'>
      <div className='flex justify-between'>
        <div className='text-xl font-bold'>{title}</div>
        <div className='flex gap-x-3'>
          <div className='flex gap-x-3'>
            {colors.map((color) => (
              <div
                key={color.name}
                className={`relative h-[30px] w-[30px] rounded-full ${color.bgColor} cursor-pointer`}
                onClick={() => handleColorClick(color.name)}
              >
                {selectedColor === color.name && (
                  <Image
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'
                    src='/images/check.svg'
                    alt='check'
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-9'>
        <div>대시보드 이름</div>
        <input
          className='mt-[10px] w-full rounded-md border border-custom_gray-_d9d9d9 p-4'
          placeholder='뉴프로젝트'
          value={dashboardName}
          onChange={handleInputChange}
        />
      </div>
      <div className='mt-6 flex justify-end'>
        <button
          onClick={onClick}
          className='rounded bg-custom_violet-_5534da px-[46px] py-[14px] text-white max-sm:px-[23px] max-sm:py-[6px]'
        >
          변경
        </button>
      </div>
    </div>
  );
};

export default UpdateDashboardName;
