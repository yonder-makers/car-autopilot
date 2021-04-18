import { Card, Slider } from 'antd';
import React, { useEffect } from 'react';
import { AutopilotHook } from '../domain/use-autopilot';
import { usePersistConfig } from '../domain/use-persisted-config';

interface PidControlsProps {
  autopilot: AutopilotHook;
}
export function PidDiag({ autopilot }: PidControlsProps) {
  return (
    <Card title="PID Diag">
      <div> Error: {autopilot.error}</div>
      <div> Integral: {autopilot.integral}</div>
      <div> Derivative: {autopilot.derivative}</div>
      <div> Output: {autopilot.output}</div>
    </Card>
  );
}
