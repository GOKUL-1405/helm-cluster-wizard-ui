
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ClusterOverview } from '@/components/dashboard/ClusterOverview';
import { HelmReleasesList } from '@/components/dashboard/HelmReleasesList';
import { ChartRepositories } from '@/components/dashboard/ChartRepositories';
import { DeploymentStatus } from '@/components/dashboard/DeploymentStatus';
import { ActivityLog } from '@/components/dashboard/ActivityLog';

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your Kubernetes clusters and Helm releases</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClusterOverview />
          <DeploymentStatus />
        </div>
        
        <HelmReleasesList />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartRepositories />
          <ActivityLog />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
