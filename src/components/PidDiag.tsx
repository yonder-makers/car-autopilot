import { Card } from 'antd';
import React from 'react';
import { AutopilotHook } from '../hooks/use-pid-autopilot';

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
