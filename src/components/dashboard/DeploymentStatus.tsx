
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const DeploymentStatus = () => {
  // Mock data - in a real app, this would come from a Kubernetes API
  const deployments = [
    { 
      name: "frontend", 
      namespace: "default",
      ready: "3/3", 
      upToDate: 3, 
      available: 3,
      health: 100
    },
    { 
      name: "backend-api", 
      namespace: "default",
      ready: "2/2", 
      upToDate: 2, 
      available: 2,
      health: 100
    },
    { 
      name: "database", 
      namespace: "database",
      ready: "1/1", 
      upToDate: 1, 
      available: 1,
      health: 100
    },
    { 
      name: "redis-cache", 
      namespace: "database",
      ready: "0/1", 
      upToDate: 0, 
      available: 0,
      health: 0
    },
    { 
      name: "monitoring", 
      namespace: "monitoring",
      ready: "1/2", 
      upToDate: 1, 
      available: 1,
      health: 50
    },
  ];

  const getHealthStatus = (health: number) => {
    if (health === 100) return <Badge className="bg-green-500">Healthy</Badge>;
    if (health >= 50) return <Badge variant="outline" className="border-amber-500 text-amber-500">Degraded</Badge>;
    return <Badge variant="destructive">Critical</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deployments.map((deployment) => (
            <div key={deployment.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{deployment.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({deployment.namespace})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{deployment.ready}</span>
                  {getHealthStatus(deployment.health)}
                </div>
              </div>
              <Progress value={deployment.health} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
