
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const Releases = () => {
  const { toast } = useToast();
  const [selectedRelease, setSelectedRelease] = useState<string | null>(null);
  
  // Mock releases data
  const releases = [
    { 
      name: "nginx-ingress", 
      namespace: "kube-system", 
      chart: "nginx-ingress", 
      version: "4.1.0", 
      appVersion: "1.5.1",
      status: "deployed",
      description: "An nginx Ingress controller that uses ConfigMap to store the nginx configuration.",
      updated: "2 days ago",
      resources: ["Deployment", "Service", "ConfigMap", "ServiceAccount"],
      values: `controller:
  replicaCount: 2
  service:
    type: LoadBalancer
    externalTrafficPolicy: Local
  metrics:
    enabled: true
    serviceMonitor:
      enabled: true`
    },
    { 
      name: "prometheus", 
      namespace: "monitoring", 
      chart: "prometheus", 
      version: "15.5.3", 
      appVersion: "2.37.0",
      status: "deployed", 
      description: "Prometheus is an open-source systems monitoring and alerting toolkit.",
      updated: "5 days ago",
      resources: ["StatefulSet", "Service", "ServiceMonitor", "PodMonitor", "PrometheusRule"],
      values: `alertmanager:
  enabled: true
  persistence:
    enabled: true
    size: 10Gi
server:
  replicaCount: 2
  retention: 15d
  persistentVolume:
    enabled: true
    size: 50Gi`
    },
    { 
      name: "elasticsearch", 
      namespace: "logging", 
      chart: "elasticsearch", 
      version: "7.17.1",
      appVersion: "7.17.1",
      status: "deployed",
      description: "Elasticsearch is a distributed, RESTful search and analytics engine.",
      updated: "1 week ago",
      resources: ["StatefulSet", "Service", "ConfigMap", "ServiceAccount"],
      values: `replicas: 3
minimumMasterNodes: 2
persistence:
  enabled: true
  size: 100Gi
resources:
  requests:
    cpu: 1000m
    memory: 2Gi
  limits:
    cpu: 2000m
    memory: 4Gi`
    },
    { 
      name: "mysql", 
      namespace: "database", 
      chart: "bitnami/mysql", 
      version: "9.3.1",
      appVersion: "8.0.30",
      status: "failed",
      description: "MySQL is an open source relational database management system.",
      updated: "3 days ago",
      resources: ["StatefulSet", "Service", "PersistentVolumeClaim", "ConfigMap", "Secret"],
      values: `architecture: standalone
auth:
  rootPassword: "password"
  database: app
primary:
  persistence:
    enabled: true
    size: 20Gi`
    },
  ];

  const handleUpgrade = (releaseName: string) => {
    toast({
      title: "Upgrading Release",
      description: `Starting upgrade for ${releaseName}. This may take a few minutes.`,
    });
  };

  const handleRollback = (releaseName: string) => {
    toast({
      title: "Rolling Back",
      description: `Starting rollback for ${releaseName}. This may take a few minutes.`,
    });
  };

  const handleDelete = (releaseName: string) => {
    toast({
      title: "Delete Release",
      description: `Are you sure you want to delete ${releaseName}? This action cannot be undone.`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "deployed":
        return <Badge className="bg-green-500">Deployed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const selectedReleaseData = selectedRelease 
    ? releases.find(r => r.name === selectedRelease) 
    : null;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Helm Releases</h1>
            <p className="text-muted-foreground">Manage your Helm chart releases</p>
          </div>
          <Button onClick={() => {
            toast({
              title: "Deploy Wizard",
              description: "The deployment wizard will be available in the next update.",
            });
          }}>Deploy New Chart</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Release List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {releases.map((release) => (
                    <div 
                      key={release.name}
                      className={`p-3 border rounded-md cursor-pointer ${selectedRelease === release.name ? 'bg-muted border-primary' : 'hover:bg-accent/50'}`}
                      onClick={() => setSelectedRelease(release.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{release.name}</div>
                        {getStatusBadge(release.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">{release.namespace}</div>
                      <div className="text-xs mt-1">Chart: {release.chart} {release.version}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {selectedReleaseData ? (
              <Card>
                <CardHeader className="border-b pb-3">
                  <div className="flex justify-between">
                    <CardTitle>{selectedReleaseData.name}</CardTitle>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleRollback(selectedReleaseData.name)}>Rollback</Button>
                      <Button size="sm" variant="default" onClick={() => handleUpgrade(selectedReleaseData.name)}>Upgrade</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(selectedReleaseData.name)}>Delete</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Namespace</div>
                      <div>{selectedReleaseData.namespace}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Status</div>
                      <div>{getStatusBadge(selectedReleaseData.status)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Last Updated</div>
                      <div>{selectedReleaseData.updated}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-6">
                    <div className="text-sm font-medium">Description</div>
                    <div>{selectedReleaseData.description}</div>
                  </div>
                  
                  <Tabs defaultValue="resources">
                    <TabsList>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      <TabsTrigger value="values">Values</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="resources" className="mt-4">
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Type</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedReleaseData.resources.map((resource, i) => (
                              <TableRow key={i}>
                                <TableCell>{resource}</TableCell>
                                <TableCell>{`${selectedReleaseData.name}-${resource.toLowerCase()}`}</TableCell>
                                <TableCell>
                                  <Badge className={selectedReleaseData.status === "failed" && i === 0 ? "bg-red-500" : "bg-green-500"}>
                                    {selectedReleaseData.status === "failed" && i === 0 ? "Failed" : "Ready"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    <TabsContent value="values" className="mt-4">
                      <div className="terminal">
                        <ScrollArea className="h-[300px] w-full">
                          <pre>{selectedReleaseData.values}</pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent value="history" className="mt-4">
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Revision</TableHead>
                              <TableHead>Updated</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Chart</TableHead>
                              <TableHead>App Version</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell>{selectedReleaseData.updated}</TableCell>
                              <TableCell>{getStatusBadge(selectedReleaseData.status)}</TableCell>
                              <TableCell>{`${selectedReleaseData.chart}-${selectedReleaseData.version}`}</TableCell>
                              <TableCell>{selectedReleaseData.appVersion}</TableCell>
                              <TableCell>Install complete</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-lg font-medium mb-2">No Release Selected</h3>
                  <p className="text-muted-foreground">Select a release from the list to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Releases;
