
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const Clusters = () => {
  const { toast } = useToast();
  const [activeCluster, setActiveCluster] = useState("production");
  
  // Mock cluster data
  const clusters = {
    production: {
      name: "production",
      status: "Healthy",
      version: "v1.25.4",
      nodes: 3,
      pods: 24,
      cpuUsage: 42,
      memoryUsage: 38,
      storageUsage: 29,
      nodes_info: [
        { name: "master-1", role: "control-plane", status: "Ready", cpu: "4 / 8 cores", memory: "8GB / 16GB" },
        { name: "worker-1", role: "worker", status: "Ready", cpu: "2 / 4 cores", memory: "4GB / 8GB" },
        { name: "worker-2", role: "worker", status: "Ready", cpu: "2 / 4 cores", memory: "4GB / 8GB" },
      ]
    },
    staging: {
      name: "staging",
      status: "Warning",
      version: "v1.24.9",
      nodes: 2,
      pods: 15,
      cpuUsage: 78,
      memoryUsage: 65,
      storageUsage: 42,
      nodes_info: [
        { name: "master-1", role: "control-plane", status: "Ready", cpu: "2 / 4 cores", memory: "6GB / 8GB" },
        { name: "worker-1", role: "worker", status: "NotReady", cpu: "2 / 4 cores", memory: "3GB / 4GB" },
      ]
    }
  };

  const handleConnect = () => {
    toast({
      title: "Coming Soon",
      description: "The connect cluster feature will be available in the next update.",
    });
  };

  const selectedCluster = clusters[activeCluster as keyof typeof clusters];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clusters</h1>
            <p className="text-muted-foreground">Manage your Kubernetes clusters</p>
          </div>
          <Button onClick={handleConnect}>Connect Cluster</Button>
        </div>
        
        <Tabs defaultValue="production" onValueChange={(value) => setActiveCluster(value)}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="production">Production</TabsTrigger>
            <TabsTrigger value="staging">Staging</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedCluster.name}</CardTitle>
                  <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedCluster.status === "Healthy" ? "bg-green-500" : "bg-amber-500"}`}></span>
                    <span>{selectedCluster.status}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{selectedCluster.version}</div>
                        <div className="text-sm text-muted-foreground mt-2">Kubernetes Version</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{selectedCluster.nodes}</div>
                        <div className="text-sm text-muted-foreground mt-2">Nodes</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{selectedCluster.pods}</div>
                        <div className="text-sm text-muted-foreground mt-2">Pods</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{selectedCluster.cpuUsage}%</span>
                    </div>
                    <Progress value={selectedCluster.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{selectedCluster.memoryUsage}%</span>
                    </div>
                    <Progress value={selectedCluster.memoryUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span>{selectedCluster.storageUsage}%</span>
                    </div>
                    <Progress value={selectedCluster.storageUsage} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Nodes</h3>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-5 gap-4 p-3 border-b bg-muted font-medium">
                      <div>Node</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div>CPU</div>
                      <div>Memory</div>
                    </div>
                    {selectedCluster.nodes_info.map((node, index) => (
                      <div key={index} className="grid grid-cols-5 gap-4 p-3 border-b last:border-0">
                        <div>{node.name}</div>
                        <div>{node.role}</div>
                        <div>
                          <Badge 
                            variant={node.status === "Ready" ? "default" : "destructive"} 
                            className={node.status === "Ready" ? "bg-green-500" : ""}
                          >
                            {node.status}
                          </Badge>
                        </div>
                        <div>{node.cpu}</div>
                        <div>{node.memory}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Clusters;
