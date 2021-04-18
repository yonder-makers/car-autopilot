import { Card, Radio, Slider, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePersistConfig } from '../domain/use-persisted-config';
import { SimulatorHook } from '../domain/use-simulator';
import { AutoPilot } from './AutoPilot';

interface ControlPanelProps {
  simulator: SimulatorHook;
}
export function ControlPanel({ simulator }: ControlPanelProps) {
  const { throttle, setThrottle } = simulator;
  const [controlMode, setControlMode] = useState(1);

  usePersistConfig('control-mode', controlMode, setControlMode);

  return (
    <Space direction="vertical">
      <Card>
        Mode:
        <Radio.Group
          onChange={(e) => setControlMode(e.target.value)}
          value={controlMode}
        >
          <Radio value={1}>Manual</Radio>
          <Radio value={2}>Autopilot</Radio>
          <Radio value={3}>Limit</Radio>
        </Radio.Group>
        <Space style={{ width: '100%' }}>
          Throttle:
          <Slider
            disabled={controlMode !== 1}
            min={1}
            max={100}
            onChange={setThrottle}
            value={throttle}
            style={{ width: 200 }}
          />
        </Space>
      </Card>
      {controlMode === 2 && <AutoPilot simulator={simulator}></AutoPilot>}
    </Space>
  );
}
