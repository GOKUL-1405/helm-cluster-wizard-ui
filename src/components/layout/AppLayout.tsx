
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppTopBar } from './AppTopBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppTopBar />
          <main className="container py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
