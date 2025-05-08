
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ClusterOverview = () => {
  // Mock data - in a real app, this would come from a Kubernetes API
  const clusterStats = {
    name: "production",
    status: "Healthy",
    version: "v1.25.4",
    nodes: 3,
    pods: 24,
    cpuUsage: 42,
    memoryUsage: 38,
    storageUsage: 29,
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{clusterStats.name}</CardTitle>
            <CardDescription>Kubernetes {clusterStats.version}</CardDescription>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm font-medium">{clusterStats.status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{clusterStats.nodes}</div>
            <div className="text-sm text-muted-foreground">Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{clusterStats.pods}</div>
            <div className="text-sm text-muted-foreground">Pods</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">5</div>
            <div className="text-sm text-muted-foreground">Deployments</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>CPU Usage</span>
              <span>{clusterStats.cpuUsage}%</span>
            </div>
            <Progress value={clusterStats.cpuUsage} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span>{clusterStats.memoryUsage}%</span>
            </div>
            <Progress value={clusterStats.memoryUsage} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage Usage</span>
              <span>{clusterStats.storageUsage}%</span>
            </div>
            <Progress value={clusterStats.storageUsage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
