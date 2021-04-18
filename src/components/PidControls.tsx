import { Card, Slider } from 'antd';
import React, { useEffect } from 'react';
import { AutopilotHook } from '../domain/use-autopilot';
import { usePersistConfig } from '../domain/use-persisted-config';

interface PidDiagProps {
  autopilot: AutopilotHook;
}
export function PidControls({ autopilot }: PidDiagProps) {
  const { config } = autopilot;

  usePersistConfig('pid-controls', config, autopilot.setCoeficients);

  return (
    <Card title="PID Coeficients">
      <div>p: {config.p}</div>
      <Slider
        min={0}
        max={40}
        step={0.01}
        onChange={(v: number) => autopilot.setCoeficients({ ...config, p: v })}
        value={config.p}
        style={{ width: 400 }}
      />
      <div>i: {config.i}</div>
      <Slider
        min={0}
        max={10}
        step={0.01}
        onChange={(v: number) => autopilot.setCoeficients({ ...config, i: v })}
        value={config.i}
        style={{ width: 400 }}
      />
      <div>d: {config.d}</div>
      <Slider
        min={0}
        max={10}
        step={0.01}
        onChange={(v: number) => autopilot.setCoeficients({ ...config, d: v })}
        value={config.d}
        style={{ width: 400 }}
      />
    </Card>
  );
}
