
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

// Import icons
import { 
  ArrowRight, 
  CircleArrowUp, 
  ChevronRight,
  MoveUp
} from 'lucide-react';

export function AppSidebar() {
  const { toast } = useToast();
  
  const navigationItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MoveUp className="w-5 h-5" />
    },
    {
      title: "Clusters",
      path: "/clusters",
      icon: <CircleArrowUp className="w-5 h-5" />
    },
    {
      title: "Helm Releases",
      path: "/releases",
      icon: <ArrowRight className="w-5 h-5" />
    },
    {
      title: "Repositories",
      path: "/repositories",
      icon: <ChevronRight className="w-5 h-5" />
    }
  ];

  return (
    <Sidebar>
      <div className="flex items-center justify-center py-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 helm-gradient rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0.5 bg-sidebar-background rounded-full flex items-center justify-center">
              <span className="text-sidebar-foreground font-bold text-lg">H</span>
            </div>
          </div>
          <h1 className="text-sidebar-foreground font-bold text-xl">Helm Wizard</h1>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Connected Clusters</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-3 py-2">
              <div className="flex items-center justify-between mb-2 p-2 bg-sidebar-accent rounded-md">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">production</span>
                </div>
                <span className="text-xs text-sidebar-foreground/60">3 nodes</span>
              </div>
              <div className="flex items-center justify-between mb-2 p-2 bg-sidebar-accent rounded-md">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm">staging</span>
                </div>
                <span className="text-xs text-sidebar-foreground/60">2 nodes</span>
              </div>
              <button 
                className="w-full text-sm text-sidebar-accent-foreground bg-sidebar-accent/70 rounded-md p-2 mt-2 hover:bg-sidebar-accent transition-colors"
                onClick={() => toast({
                  title: "Coming Soon",
                  description: "The ability to add new clusters will be available soon.",
                })}
              >
                + Add Cluster
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
