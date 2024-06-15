'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckInvitationsRes } from '../api/apiTypes/invitationsType';
import { useDashboardData } from '@/context/DashboardDataContext';
import { useRouter } from 'next/navigation';
import instance from '../api/axios';

const InvitedDashboardListMobile = () => {
  const [invitations, setInvitations] = useState<
    CheckInvitationsRes['invitations']
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvitations, setFilteredInvitations] = useState<
    CheckInvitationsRes['invitations']
  >([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const size = 6;
  const { setDashboardsData } = useDashboardData();
  const router = useRouter();

  const intersectionTargetRef = useRef<HTMLDivElement | null>(null);

  const fetchInvitations = async (cursorId: number | null) => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const res = await instance.get('invitations', {
        params: { cursorId, size },
      });
      const newInvitations = res.data.invitations;
      setInvitations((prev) => {
        const mergedInvitations = [...prev, ...newInvitations];
        const uniqueInvitations = mergedInvitations.filter(
          (invitation, index, self) =>
            index === self.findIndex((i) => i.id === invitation.id),
        );
        return uniqueInvitations;
      });

      setFilteredInvitations((prev) => {
        const mergedFilteredInvitations = [...prev, ...newInvitations];
        const uniqueFilteredInvitations = mergedFilteredInvitations.filter(
          (invitation, index, self) =>
            index === self.findIndex((i) => i.id === invitation.id),
        );
        return uniqueFilteredInvitations;
      });

      if (newInvitations.length > 0) {
        setCursorId(newInvitations[newInvitations.length - 1].id);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('초대 목록을 불러오는 데 실패했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        fetchInvitations(cursorId);
      }
    },
    [cursorId, loading, hasMore],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    const target = intersectionTargetRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    fetchInvitations(null);
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInvitationResponse = async (
    invitationId: number,
    inviteAccepted: boolean,
  ) => {
    try {
      const res = await instance.put(`invitations/${invitationId}`, {
        inviteAccepted,
      });

      setInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId),
      );
      setFilteredInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId),
      );

      if (inviteAccepted) {
        const dashboardRes = await instance.get(
          `/dashboards/${res.data.dashboard.id}`,
        );
        setDashboardsData((prev) => {
          const newData = [];
          prev.forEach((item) => {
            if (item.createdByMe) {
              newData.push(item);
            }
          });
          newData.push(dashboardRes.data);
          prev.forEach((item) => {
            if (!item.createdByMe) {
              newData.push(item);
            }
          });

          const slicedData = newData.slice(0, 10);

          return slicedData;
        });

        router.push(`/dashboard/${dashboardRes.data.id}`);
      }
    } catch (error) {
      console.error('초대 목록을 불러오는데 실패했습니다.', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedFilterInvitations(e.target.value);
  };

  const debouncedFilterInvitations = useCallback(
    debounce((term: string) => {
      if (term === '') {
        setFilteredInvitations(invitations);
      } else {
        setFilteredInvitations(
          invitations.filter((invitation) =>
            invitation.dashboard.title
              .toLowerCase()
              .includes(term.toLowerCase()),
          ),
        );
      }
    }, 500),
    [invitations],
  );

  return (
    <div className='ml-6 mt-6 h-[800px] overflow-scroll rounded-lg bg-custom_white px-7 py-8'>
      <div className='text-2xl font-bold text-custom_black-_333236'>
        초대받은 대시보드
      </div>
      {invitations.length === 0 ? (
        <div className='flex flex-col items-center justify-center'>
          <Image
            src='/images/no-invitation.svg'
            width={100}
            height={100}
            alt='no invitation'
          />
          <div>아직 초대받은 대시보드가 없어요.</div>
        </div>
      ) : (
        <>
          <div className='relative mt-5'>
            <input
              className='w-full rounded-md border border-custom_gray-_d9d9d9 p-3 indent-8 text-[16px]'
              placeholder='검색'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Image
              className='absolute top-[15px] ml-4'
              src='/images/search.svg'
              alt='search'
              width={15}
              height={15}
            />
          </div>
          <div>
            {filteredInvitations.map((invitation) => (
              <div key={invitation.id} className='mt-5'>
                <div className='flex gap-x-7 text-[14px]'>
                  <div className='text-custom_gray-_9fa6b2'>이름</div>
                  <div>{invitation.dashboard.title}</div>
                </div>
                <div className='flex gap-x-4 text-[14px]'>
                  <div className='text-custom_gray-_9fa6b2'>초대자</div>
                  <div className=''>{invitation.inviter.nickname}</div>
                </div>
                <div className='mt-5 flex gap-x-[10px]'>
                  <button
                    className='flex-1 rounded bg-custom_violet-_5534da px-7 py-2 text-white'
                    onClick={() =>
                      handleInvitationResponse(invitation.id, true)
                    }
                  >
                    수락
                  </button>
                  <button
                    className='flex-1 rounded border border-custom_gray-_d9d9d9 bg-white px-7 py-2 text-custom_violet-_5534da'
                    onClick={() =>
                      handleInvitationResponse(invitation.id, false)
                    }
                  >
                    거절
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div ref={intersectionTargetRef} style={{ height: '1px' }}></div>
    </div>
  );
};

export default InvitedDashboardListMobile;
