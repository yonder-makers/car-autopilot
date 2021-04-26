import { Card, Radio, Slider, Space } from 'antd';
import React, { useState } from 'react';
import { usePersistConfig } from '../domain/use-persisted-config';
import { SimulatorHook } from '../domain/use-simulator';
import { AiPilot } from './AiPilot';
import { DumbAutoPilot } from './DumbAutoPilot';
import { PidPilot } from './PidPilot';

interface ControlPanelProps {
  simulator: SimulatorHook;
}
export function ControlPanel({ simulator }: ControlPanelProps) {
  const { throttle, setThrottle } = simulator;
  const [controlMode, setControlMode] = useState(1);

  usePersistConfig('control-mode', controlMode, setControlMode);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        Mode:
        <Radio.Group
          onChange={(e) => setControlMode(e.target.value)}
          value={controlMode}
        >
          <Radio value={1}>Manual</Radio>
          <Radio value={2}>Dumb Autopilot</Radio>
          <Radio value={3}>Autopilot</Radio>
          <Radio value={4}>AI pilot</Radio>
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
      {controlMode === 2 && (
        <DumbAutoPilot simulator={simulator}></DumbAutoPilot>
      )}
      {controlMode === 3 && <PidPilot simulator={simulator}></PidPilot>}
      {controlMode === 4 && <AiPilot simulator={simulator}></AiPilot>}
    </Space>
  );
}
