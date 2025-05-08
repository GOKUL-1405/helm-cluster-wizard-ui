
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

// Mock data - in a real app, this would come from Helm API
const initialReleases = [
  { 
    name: "nginx-ingress", 
    namespace: "kube-system", 
    chart: "nginx-ingress", 
    version: "4.1.0", 
    status: "deployed", 
    updated: "2 days ago",
    isUpdating: false
  },
  { 
    name: "prometheus", 
    namespace: "monitoring", 
    chart: "prometheus", 
    version: "15.5.3", 
    status: "deployed", 
    updated: "5 days ago",
    isUpdating: false 
  },
  { 
    name: "elasticsearch", 
    namespace: "logging", 
    chart: "elasticsearch", 
    version: "7.17.1", 
    status: "deployed", 
    updated: "1 week ago",
    isUpdating: false 
  },
  { 
    name: "mysql", 
    namespace: "database", 
    chart: "bitnami/mysql", 
    version: "9.3.1", 
    status: "failed", 
    updated: "3 days ago",
    isUpdating: false 
  },
];

export const HelmReleasesList = () => {
  const [releases, setReleases] = useState(initialReleases);
  const { toast } = useToast();

  const handleUpgrade = (name: string) => {
    // In a real app, this would trigger a Helm upgrade command
    setReleases(prevReleases => 
      prevReleases.map(release => 
        release.name === name ? { ...release, isUpdating: true } : release
      )
    );
    
    toast({
      title: "Upgrading release",
      description: `Upgrading ${name}...`,
    });
    
    // Simulate completed upgrade after delay
    setTimeout(() => {
      setReleases(prevReleases => 
        prevReleases.map(release => 
          release.name === name 
            ? { 
                ...release, 
                isUpdating: false, 
                status: "deployed",
                updated: "just now",
                version: release.version.split('.').map((v, i) => i === 2 ? Number(v) + 1 : v).join('.')
              } 
            : release
        )
      );
      
      toast({
        title: "Upgrade complete",
        description: `${name} was upgraded successfully`,
      });
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "deployed":
        return <Badge variant="default" className="bg-green-500">Deployed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Helm Releases</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Namespace</TableHead>
              <TableHead>Chart</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {releases.map((release) => (
              <TableRow key={release.name}>
                <TableCell className="font-medium">{release.name}</TableCell>
                <TableCell>{release.namespace}</TableCell>
                <TableCell>{release.chart}</TableCell>
                <TableCell>{release.version}</TableCell>
                <TableCell>{release.isUpdating ? <span className="status-pulse">Updating...</span> : getStatusBadge(release.status)}</TableCell>
                <TableCell>{release.updated}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={release.isUpdating} 
                    onClick={() => handleUpgrade(release.name)}
                  >
                    {release.isUpdating ? "Upgrading..." : "Upgrade"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
