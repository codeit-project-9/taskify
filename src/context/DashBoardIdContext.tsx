'use client';

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

interface DashboardIdContextType {
  dashboardID: number;
  setDashboardID: Dispatch<SetStateAction<number>>;
}

export const DashboardIdContext = createContext<
  DashboardIdContextType | undefined
>(undefined);

interface DashboardIdProviderProps {
  children: ReactNode;
}

export const DashboardIdProvider: React.FC<DashboardIdProviderProps> = ({
  children,
}) => {
  const [dashboardID, setDashboardID] = useState<number>(0);

  return (
    <DashboardIdContext.Provider value={{ dashboardID, setDashboardID }}>
      {children}
    </DashboardIdContext.Provider>
  );
};

export const useDashboardId = () => {
  const context = useContext(DashboardIdContext);
  if (context === undefined) {
    throw new Error('useDashboardId must be used within a DashboardIdProvider');
  }
  return context;
};

/* 
const {dashboardID} = useDashboardId();
*/
