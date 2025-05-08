
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

export const AppTopBar = () => {
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Updating cluster information...",
    });
  };

  return (
    <div className="w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
        </div>
        <div className="flex-1 flex items-center justify-end">
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 text-sm bg-muted px-3 py-1 rounded-md">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Connected</span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              className="h-8"
            >
              Refresh
            </Button>
            <Button variant="default" className="h-8" onClick={() => {
              toast({
                title: "Deploy Action",
                description: "The deploy wizard will be available in the next update.",
              });
            }}>
              Deploy Chart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
