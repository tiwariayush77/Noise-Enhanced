'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import CircularProgress from '@/components/shared/circular-progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Watch, Radio, Zap } from 'lucide-react';

interface DeviceCardProps {
  name: string;
  battery: number | null;
  daysLeft?: number;
  status: 'connected' | 'disconnected';
  contribution?: string;
  potential?: string;
  badge?: string;
  icon: React.ReactNode;
  action?: string;
}

const RingIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


function DeviceCard({ name, battery, status, badge, icon, action }: DeviceCardProps) {
  const isConnected = status === 'connected';
  const daysLeft = battery ? battery / 15 : undefined;
  const contribution = isConnected ? `+${Math.floor(Math.random() * 20 + 5)} points` : undefined;
  const potential = !isConnected ? `+${Math.floor(Math.random() * 20 + 10)} points` : undefined;


  return (
    <Card className="p-4 bg-card overflow-hidden relative">
      <div className="flex gap-4">
        <div className="text-4xl p-3 bg-secondary rounded-lg flex items-center justify-center">{icon}</div>
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold">{name}</h3>
          {isConnected ? (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wifi size={14} className="text-success" />
                <span>{battery}%</span>
              </div>
              {daysLeft && <span>{daysLeft?.toFixed(1)} days left</span>}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <WifiOff size={14} className="text-destructive" />
              <span>Disconnected</span>
            </div>
          )}

          {action ? (
            <Button variant="link" className="p-0 h-auto text-accent">
              {action}
            </Button>
          ) : (
            <p className="text-sm text-primary">{contribution || potential}</p>
          )}
        </div>
        {badge && <Badge className="absolute top-2 right-2 bg-success text-black">{badge}</Badge>}
      </div>
    </Card>
  );
}


export default function DevicesTab() {
  const { devices, mockData } = useContext(AppContext);
  const deviceIcons: { [key: string]: React.ReactNode } = {
    watch: <Watch />,
    ring: <RingIcon />,
    earbuds: <Radio />,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Devices</h2>

      <Card className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-primary-foreground">
          <Zap className="w-5 h-5 mr-2" />
          Ecosystem Intelligence
        </h3>
        <div className="text-center text-primary-foreground">
          <div className="text-4xl font-bold mb-2">{mockData.ecosystemScore}/100</div>
          <div className="font-semibold mb-1 text-success">EXCELLENT</div>
          <div className="text-sm text-primary-foreground/80">Multi-device harmony</div>
        </div>
      </Card>

      <div className="space-y-4">
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            name={device.name}
            battery={device.battery}
            status={device.connected ? 'connected' : 'disconnected'}
            icon={deviceIcons[device.type]}
            badge={device.name.includes('Luna') ? 'NEW!' : undefined}
            action={!device.connected ? 'Connect for Audio Health' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
