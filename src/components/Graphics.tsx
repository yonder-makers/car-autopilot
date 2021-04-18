import { Card, Space } from 'antd';
import React from 'react';
import { RealtimeChart } from './RealtimeChart';
import { SimulatorHook } from '../domain/use-simulator';

interface GraphicsProps {
  simulator: SimulatorHook;
}
export function Graphics({ simulator }: GraphicsProps) {
  const { speed, time, throttle } = simulator;

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <RealtimeChart
          title={'Speed: ' + Math.floor(speed)}
          simTime={time}
          currentValue={speed}
          min={0}
          max={230}
        />
      </Card>
      <Card>
        <RealtimeChart
          title={'Throttle: ' + throttle}
          simTime={time}
          currentValue={throttle}
          min={0}
          max={100}
        />
      </Card>
    </Space>
  );
}
