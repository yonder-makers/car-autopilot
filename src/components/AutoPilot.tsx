import { Button, Card, Slider, Space } from 'antd';
import React, { useState } from 'react';
import { useAdjustTime } from '../domain/use-adjusted-time';
import { useAutopilot } from '../domain/use-autopilot';
import { SimulatorHook } from '../domain/use-simulator';
import { PidControls } from './PidControls';
import { PidDiag } from './PidDiag';
import { TargetSpeedSetter } from './TargetSpeedSetter';

interface AutoPilotProps {
  simulator: SimulatorHook;
}
export function AutoPilot({ simulator }: AutoPilotProps) {
  const { speed, simTime: time } = simulator;

  const [targetSpeed, setTargetSpeed] = useState(Math.floor(speed));

  const autopilot = useAutopilot(simulator, targetSpeed);

  const { adjustingTime, hitCount } = useAdjustTime(targetSpeed, speed, time);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Autopilot">
        <TargetSpeedSetter
          changeSpeed={setTargetSpeed}
          targetSpeed={targetSpeed}
        ></TargetSpeedSetter>
        <div>
          Adjusting time: {adjustingTime}
          {'seconds '}
          {hitCount && <span>(hit: {hitCount})</span>}
        </div>
      </Card>
      <PidDiag autopilot={autopilot}></PidDiag>
      <PidControls autopilot={autopilot}></PidControls>
    </Space>
  );
}
