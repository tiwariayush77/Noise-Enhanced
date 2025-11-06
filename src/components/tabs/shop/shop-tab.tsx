'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Watch, Headphones, Radio, Package } from 'lucide-react';

export default function ShopTab() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Shop</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        
        <Card className="bg-card rounded-2xl p-6 text-center aspect-square flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Watch className="w-8 h-8 text-foreground" />
          </div>
          <h3 className="font-semibold mb-1">Smart Watches</h3>
        </Card>
        
        <Card className="bg-card rounded-2xl p-6 text-center aspect-square flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Headphones className="w-8 h-8 text-foreground" />
          </div>
          <h3 className="font-semibold mb-1">Headphones</h3>
        </Card>
        
        <Card className="bg-card rounded-2xl p-6 text-center aspect-square flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Radio className="w-8 h-8 text-foreground" />
          </div>
          <h3 className="font-semibold mb-1 leading-tight">Truly Wireless Earbuds</h3>
        </Card>
        
        <Card className="bg-card rounded-2xl p-6 text-center aspect-square flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Package className="w-8 h-8 text-foreground" />
          </div>
          <h3 className="font-semibold mb-1">Accessories</h3>
        </Card>
      </div>
      
      <Card className="bg-gradient-to-r from-primary to-pink-600 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">ColorFit Pro 6 Max</h3>
            <p className="text-primary-foreground/80 text-sm">Advanced health tracking</p>
            <Button className="bg-white text-primary rounded-lg text-sm font-medium mt-3 hover:bg-white/90">
              Shop now
            </Button>
          </div>
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Watch className="w-10 h-10 text-white" />
          </div>
        </div>
      </Card>
    </div>
  );
}
