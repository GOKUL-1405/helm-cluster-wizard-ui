
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from a Helm API
const repositories = [
  { name: "bitnami", url: "https://charts.bitnami.com/bitnami", status: "synced", lastUpdate: "1 hour ago" },
  { name: "stable", url: "https://charts.helm.sh/stable", status: "synced", lastUpdate: "1 day ago" },
  { name: "jetstack", url: "https://charts.jetstack.io", status: "failed", lastUpdate: "3 days ago" },
];

export const ChartRepositories = () => {
  const { toast } = useToast();

  const handleUpdate = (repo: string) => {
    toast({
      title: "Updating repository",
      description: `Syncing ${repo} repository...`,
    });
    
    // Simulate successful update after delay
    setTimeout(() => {
      toast({
        title: "Repository updated",
        description: `${repo} repository synced successfully`,
      });
    }, 2000);
  };

  const getStatusIndicator = (status: string) => {
    switch(status) {
      case "synced":
        return <Badge className="bg-green-500">Synced</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {repositories.map((repo) => (
            <div key={repo.name} className="flex items-center justify-between bg-card p-3 rounded-md border">
              <div>
                <div className="font-medium">{repo.name}</div>
                <div className="text-sm text-muted-foreground truncate max-w-xs">{repo.url}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div>{getStatusIndicator(repo.status)}</div>
                  <div className="text-xs text-muted-foreground mt-1">Updated {repo.lastUpdate}</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUpdate(repo.name)}
                >
                  Update
                </Button>
              </div>
            </div>
          ))}
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={() => toast({
              title: "Coming Soon",
              description: "The ability to add new repositories will be available soon.",
            })}
          >
            Add Repository
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
