import { Card } from 'antd';
import React, { useState } from 'react';
import { useDumbAutopilot } from '../hooks/use-dumb-autopilot';
import { SimulatorHook } from '../hooks/use-simulator';
import { TargetSpeedSetter } from './TargetSpeedSetter';

interface AutoPilotProps {
  simulator: SimulatorHook;
}
export function DumbAutoPilot({ simulator }: AutoPilotProps) {
  const { speed } = simulator;

  const [targetSpeed, setTargetSpeed] = useState(Math.floor(speed));

  useDumbAutopilot(simulator, targetSpeed);

  return (
    <Card title="Dumb Autopilot">
      <TargetSpeedSetter
        targetSpeed={targetSpeed}
        changeSpeed={setTargetSpeed}
      ></TargetSpeedSetter>
    </Card>
  );
}
