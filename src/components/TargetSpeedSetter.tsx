import { Button, Slider, Space } from 'antd';
import React from 'react';

interface TargetSpeedSetterProps {
  targetSpeed: number;
  changeSpeed(speed: number): void;
}
export function TargetSpeedSetter(props: TargetSpeedSetterProps) {
  const { targetSpeed, changeSpeed } = props;

  return (
    <>
      <div>Target speed: {targetSpeed}</div>
      <Space>
        <Slider
          min={0}
          max={200}
          onChange={changeSpeed}
          value={targetSpeed}
          style={{ width: 200 }}
        />
        <Button onClick={() => changeSpeed(50)}>50</Button>
        <Button onClick={() => changeSpeed(70)}>70</Button>
        <Button onClick={() => changeSpeed(90)}>90</Button>
        <Button onClick={() => changeSpeed(130)}>130</Button>
      </Space>
    </>
  );
}
