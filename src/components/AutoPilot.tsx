import { Button, Card, Slider, Space } from 'antd';
import React, { useState } from 'react';
import { useAdjustTime } from '../domain/use-adjusted-time';
import { useAutopilot } from '../domain/use-autopilot';
import { SimulatorHook } from '../domain/use-simulator';
import { PidControls } from './PidControls';

interface AutoPilotProps {
  simulator: SimulatorHook;
}
export function AutoPilot({ simulator }: AutoPilotProps) {
  const { speed, simTime: time } = simulator;

  const [targetSpeed, setTargetSpeed] = useState(Math.floor(speed));

  const autopilot = useAutopilot(simulator, targetSpeed);

  const { adjustingTime, hitCount } = useAdjustTime(targetSpeed, speed, time);

  return (
    <>
      <Card title="Autopilot">
        <div>Target speed: {targetSpeed}</div>
        <Space>
          <Slider
            min={0}
            max={200}
            onChange={setTargetSpeed}
            value={targetSpeed}
            style={{ width: 200 }}
          />
          <Button onClick={() => setTargetSpeed(50)}>50</Button>
          <Button onClick={() => setTargetSpeed(70)}>70</Button>
          <Button onClick={() => setTargetSpeed(90)}>90</Button>
          <Button onClick={() => setTargetSpeed(130)}>130</Button>
        </Space>
        <div>
          Adjusting time: {adjustingTime}{' '}
          {hitCount && <span>(hit: {hitCount})</span>}
        </div>
        <div> Error: {autopilot.error}</div>
        <div> Integral: {autopilot.integral}</div>
        <div> Derivative: {autopilot.derivative}</div>
        <div> Output: {autopilot.output}</div>
      </Card>
      <PidControls autopilot={autopilot}></PidControls>
    </>
  );
}
