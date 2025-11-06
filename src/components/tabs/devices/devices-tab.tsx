'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import CircularProgress from '@/components/shared/circular-progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Wifi, WifiOff, Watch, Radio, BrainCircuit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

function DeviceCard({ name, battery, daysLeft, status, contribution, potential, badge, icon, action }: DeviceCardProps) {
  const isConnected = status === 'connected';
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
              <span>{daysLeft?.toFixed(1)} days left</span>
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

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-4 bg-gradient-to-r from-primary/20 to-accent/20">
      <div className="flex items-start gap-3">
        <div className="text-primary">
          <BrainCircuit size={20} />
        </div>
        <div>{children}</div>
      </div>
    </Card>
  );
}

export default function DevicesTab() {
  const { devices, mockData } = useContext(AppContext);
  const deviceIcons: { [key: string]: React.ReactNode } = {
    watch: <Watch />,
    ring: '💍',
    earbuds: <Radio />,
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card rounded-xl p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">🔮 Ecosystem Intelligence</h2>
        <div className="relative inline-block">
          <CircularProgress size={100} value={mockData.ecosystemScore} color="success" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">
              {mockData.ecosystemScore}
              <span className="text-lg">/100</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <div className="text-lg font-bold text-success">EXCELLENT</div>
          <div className="text-sm text-muted-foreground">Multi-device harmony</div>
        </div>
      </Card>

      <div className="space-y-4">
        {devices.map(device => (
          <DeviceCard
            key={device.id}
            name={device.name}
            battery={device.battery}
            daysLeft={device.battery ? device.battery / 15 : undefined}
            status={device.connected ? 'connected' : 'disconnected'}
            contribution={device.connected ? `+${device.intelligence} points` : undefined}
            potential={!device.connected ? `+${device.potential} points` : undefined}
            icon={deviceIcons[device.type]}
            badge={device.name.includes('Luna') ? 'NEW!' : undefined}
            action={!device.connected ? 'Connect for Audio Health' : undefined}
          />
        ))}
      </div>

      <InsightCard>
        <div className="text-sm text-primary font-semibold mb-2">Device Synergy</div>
        <div className="text-base font-medium">Ring detected deep sleep + Watch shows perfect recovery = Expect 18% better focus today</div>
      </InsightCard>
    </div>
  );
}
