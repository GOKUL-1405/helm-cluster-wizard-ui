
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Repositories = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<string | null>('bitnami');
  
  // Mock repository data
  const repositories = [
    { 
      name: "bitnami", 
      url: "https://charts.bitnami.com/bitnami", 
      status: "synced", 
      lastUpdate: "1 hour ago",
      chartCount: 156,
      description: "Bitnami Helm charts repository with applications, databases, and infrastructure components."
    },
    { 
      name: "stable", 
      url: "https://charts.helm.sh/stable", 
      status: "synced", 
      lastUpdate: "1 day ago",
      chartCount: 286,
      description: "Official stable Helm charts repository maintained by the Helm community."
    },
    { 
      name: "jetstack", 
      url: "https://charts.jetstack.io", 
      status: "failed", 
      lastUpdate: "3 days ago",
      chartCount: 12,
      description: "Jetstack Helm charts for cert-manager and other Kubernetes add-ons."
    },
  ];
  
  // Mock charts data
  const repositoryCharts = {
    bitnami: [
      { name: "wordpress", versions: ["15.2.5", "15.2.4", "15.2.3"], appVersion: "6.2.0", description: "Web publishing platform for building blogs and websites." },
      { name: "mysql", versions: ["9.4.5", "9.4.4", "9.4.3"], appVersion: "8.0.32", description: "Fast, reliable, scalable, and easy to use open-source relational database" },
      { name: "nginx", versions: ["13.2.20", "13.2.19", "13.2.18"], appVersion: "1.23.3", description: "Chart for the nginx server" },
      { name: "redis", versions: ["17.9.2", "17.9.1", "17.9.0"], appVersion: "7.0.11", description: "Open source, advanced key-value store." },
      { name: "postgresql", versions: ["12.2.6", "12.2.5", "12.2.4"], appVersion: "15.3.0", description: "PostgreSQL is an advanced object-relational database." },
    ],
    stable: [
      { name: "grafana", versions: ["6.29.6", "6.29.5", "6.29.4"], appVersion: "9.3.6", description: "The leading tool for querying and visualizing metrics and logs" },
      { name: "prometheus", versions: ["15.18.0", "15.17.0", "15.16.2"], appVersion: "2.44.0", description: "Prometheus is an open-source monitoring system with a dimensional data model." },
      { name: "elasticsearch", versions: ["7.17.3", "7.17.2", "7.17.1"], appVersion: "7.17.3", description: "Official Elastic helm chart for Elasticsearch" },
    ],
    jetstack: [
      { name: "cert-manager", versions: ["v1.11.1", "v1.11.0", "v1.10.2"], appVersion: "v1.11.1", description: "A Kubernetes add-on to automate the management and issuance of TLS certificates" },
      { name: "trust-manager", versions: ["v0.5.0", "v0.4.1", "v0.4.0"], appVersion: "v0.5.0", description: "Trust Manager for Kubernetes" },
    ],
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "synced":
        return <Badge className="bg-green-500">Synced</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const selectedRepoData = selectedRepo ? repositories.find(repo => repo.name === selectedRepo) : null;
  const charts = selectedRepo ? repositoryCharts[selectedRepo as keyof typeof repositoryCharts] : [];
  
  const filteredCharts = charts.filter(chart => 
    chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chart.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
            <p className="text-muted-foreground">Manage your Helm chart repositories</p>
          </div>
          <Button onClick={() => {
            toast({
              title: "Coming Soon",
              description: "The ability to add new repositories will be available soon.",
            });
          }}>Add Repository</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Repository List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {repositories.map((repo) => (
                    <div 
                      key={repo.name}
                      className={`p-3 border rounded-md cursor-pointer ${selectedRepo === repo.name ? 'bg-muted border-primary' : 'hover:bg-accent/50'}`}
                      onClick={() => setSelectedRepo(repo.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{repo.name}</div>
                        {getStatusBadge(repo.status)}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">{repo.url}</div>
                      <div className="text-xs mt-1">{repo.chartCount} charts • Updated {repo.lastUpdate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            {selectedRepoData ? (
              <Card>
                <CardHeader className="border-b pb-3">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{selectedRepoData.name}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">{selectedRepoData.url}</div>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => {
                        toast({
                          title: "Repository Updated",
                          description: `${selectedRepoData.name} repository refreshed successfully.`,
                        });
                      }}>Refresh</Button>
                      <Button size="sm" variant="destructive" onClick={() => {
                        toast({
                          title: "Remove Repository",
                          description: "This action cannot be undone.",
                        });
                      }}>Remove</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="font-medium mb-1">Description</div>
                    <div className="text-sm">{selectedRepoData.description}</div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-medium">Available Charts ({charts.length})</div>
                      <Input 
                        placeholder="Search charts..." 
                        className="max-w-xs" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      {filteredCharts.length > 0 ? (
                        filteredCharts.map((chart, index) => (
                          <Card key={index} className="overflow-hidden">
                            <div className="border-l-4 border-helm-teal p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-lg">{chart.name}</h4>
                                  <div className="text-sm text-muted-foreground">{chart.description}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm">App Version: <span className="font-mono text-xs">{chart.appVersion}</span></div>
                                  <div className="text-sm mt-1">Chart Version: <span className="font-mono text-xs">{chart.versions[0]}</span></div>
                                </div>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Install Wizard",
                                      description: "The chart installation wizard will be available in the next update.",
                                    });
                                  }}
                                >
                                  Install
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No charts match your search
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-lg font-medium mb-2">No Repository Selected</h3>
                  <p className="text-muted-foreground">Select a repository from the list to view available charts</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Repositories;
