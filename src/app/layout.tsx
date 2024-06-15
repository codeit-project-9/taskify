import './globals.css';
import { ModalProvider } from '@/context/ModalContext';
import { DashboardDataProvider } from '@/context/DashboardDataContext';
import { InvitationDataProvider } from '@/context/InvitationDataContext';
import CommonModal from './components/modals/CommonModal';
import { DashboardIdProvider } from '@/context/DashBoardIdContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <ModalProvider>
          <InvitationDataProvider>
            <DashboardDataProvider>
              <DashboardIdProvider>
                {children}
                <CommonModal />
              </DashboardIdProvider>
            </DashboardDataProvider>
          </InvitationDataProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
