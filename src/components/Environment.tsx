import { Card, Slider, Space } from 'antd';
import React from 'react';
import { SimulatorHook } from '../domain/use-simulator';

interface EnvironmentProps {
  simulator: SimulatorHook;
}
export function Environment({ simulator }: EnvironmentProps) {
  const {
    wind,
    setWind,
    angle,
    setAngle,
    horsePower,
    setHorsePower,
  } = simulator;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        Horse power: {horsePower}
        <Slider
          min={0}
          max={400}
          onChange={setHorsePower}
          value={horsePower}
          style={{ width: '100%' }}
        />
      </Card>
      <Card>
        Wind speed: {wind}
        <Slider
          min={0}
          max={150}
          onChange={setWind}
          value={wind}
          style={{ width: '100%' }}
        />
      </Card>
      <Card>
        Incline: {angle}
        <Slider
          min={-25}
          max={+25}
          onChange={setAngle}
          value={angle}
          style={{ width: '100%' }}
        />
      </Card>
    </Space>
  );
}
