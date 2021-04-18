import { Button, Card, Slider, Space } from 'antd';
import React from 'react';
import { usePersistConfig } from '../domain/use-persisted-config';
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

  usePersistConfig('wind', wind, setWind);
  usePersistConfig('angle', angle, setAngle);
  usePersistConfig('horsePower', horsePower, setHorsePower);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Button onClick={() => simulator.setIsPaused(!simulator.isPaused)}>
          {simulator.isPaused ? 'Continue' : 'Pause simulator'}
        </Button>
      </Card>
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
