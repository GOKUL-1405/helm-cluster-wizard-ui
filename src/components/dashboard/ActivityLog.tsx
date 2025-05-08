
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data - in a real app, this would come from a Kubernetes/Helm API
const initialLogs = [
  { timestamp: "2023-05-08T10:15:42Z", level: "info", message: "Successfully upgraded release 'nginx-ingress' to version 4.1.0" },
  { timestamp: "2023-05-08T10:14:23Z", level: "info", message: "Scaling deployment 'prometheus' to 3 replicas" },
  { timestamp: "2023-05-08T09:55:10Z", level: "warning", message: "Pod mysql-0 restarted due to liveness probe failure" },
  { timestamp: "2023-05-08T09:45:33Z", level: "error", message: "Failed to pull image elasticsearch:7.17.1: ErrImagePull" },
  { timestamp: "2023-05-08T09:30:21Z", level: "info", message: "Helm release 'elasticsearch' deployed successfully" },
];

export const ActivityLog = () => {
  const [logs, setLogs] = useState(initialLogs);
  
  // Simulate incoming logs
  useEffect(() => {
    const newMessages = [
      { level: "info", message: "Cluster connection refreshed" },
      { level: "info", message: "Node 'worker-2' CPU usage at 78%" },
      { level: "warning", message: "PersistentVolume 'data-vol-1' is 90% full" },
      { level: "info", message: "Autoscaler increased replicas to 5" },
      { level: "error", message: "Certificate expiring in 3 days" },
    ];
    
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * newMessages.length);
      const newLog = {
        timestamp: new Date().toISOString(),
        ...newMessages[randomIndex]
      };
      
      setLogs(prev => [newLog, ...prev].slice(0, 20));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const getLogLevelStyle = (level: string) => {
    switch(level) {
      case "info": return "text-blue-500";
      case "warning": return "text-amber-500";
      case "error": return "text-red-500";
      default: return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-2">
          <div className="space-y-2 font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className="flex">
                <span className="text-muted-foreground w-16">{formatDate(log.timestamp)}</span>
                <span className={`w-16 ${getLogLevelStyle(log.level)}`}>[{log.level}]</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
