import { Card, Space } from 'antd';
import React, { useState } from 'react';
import { useAdjustTime } from '../domain/use-adjusted-time';
import { usePidAutopilot } from '../domain/use-pid-autopilot';
import { SimulatorHook } from '../domain/use-simulator';
import { PidControls } from './PidControls';
import { PidDiag } from './PidDiag';
import { TargetSpeedSetter } from './TargetSpeedSetter';

interface PidPilotProps {
  simulator: SimulatorHook;
}
export function PidPilot({ simulator }: PidPilotProps) {
  const { speed, simTime: time } = simulator;

  const [targetSpeed, setTargetSpeed] = useState(Math.floor(speed));

  const autopilot = usePidAutopilot(simulator, targetSpeed);

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
