import { Card, Col, Radio, Row, Slider, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Chart } from './Chart';
import { SimulatorHook, useSimulator } from './domain/use-simulator';
import { throttle as _throttle } from 'lodash';

export function App() {
  const simulator = useSimulator();

  return (
    <Row gutter={12}>
      <Col span={9}>
        <ControlPanel simulator={simulator}></ControlPanel>
      </Col>
      <Col span={3}>
        <Environment simulator={simulator}></Environment>
      </Col>
      <Col span={12}>
        <Graphics simulator={simulator}></Graphics>
      </Col>
    </Row>
  );
}

interface ControlPanelProps {
  simulator: SimulatorHook;
}
function ControlPanel({ simulator }: ControlPanelProps) {
  const { throttle, setThrottle } = simulator;
  const [controlMode, setControlMode] = useState(1);

  return (
    <Space direction="vertical">
      <Card>
        Mode:
        <Radio.Group
          onChange={(e) => setControlMode(e.target.value)}
          value={controlMode}
        >
          <Radio value={1}>Manual</Radio>
          <Radio value={2}>Autopilot</Radio>
          <Radio value={3}>Limit</Radio>
        </Radio.Group>
        <Space style={{ width: '100%' }}>
          Throttle:
          <Slider
            disabled={controlMode !== 1}
            min={1}
            max={100}
            onChange={setThrottle}
            value={throttle}
            style={{ width: 200 }}
          />
        </Space>
      </Card>
      {controlMode === 2 && <AutoPilot simulator={simulator}></AutoPilot>}
    </Space>
  );
}

interface AutoPilotProps {
  simulator: SimulatorHook;
}
function AutoPilot({ simulator }: AutoPilotProps) {
  const { speed, time, throttle, setThrottle } = simulator;

  const [targetSpeed, setTargetSpeed] = useState(Math.floor(speed));

  useEffect(() => {
    if (speed > targetSpeed) {
      setThrottle(0);
    } else if (speed < targetSpeed) {
      setThrottle(100);
    }
  }, [time]);

  return (
    <Card title="Autopilot">
      Target speed: {targetSpeed}
      <Slider
        min={0}
        max={200}
        onChange={setTargetSpeed}
        value={targetSpeed}
        style={{ width: 200 }}
      />
    </Card>
  );
}

interface EnvironmentProps {
  simulator: SimulatorHook;
}
function Environment({ simulator }: EnvironmentProps) {
  const { wind, setWind, angle, setAngle } = simulator;
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
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

interface GraphicsProps {
  simulator: SimulatorHook;
}
function Graphics({ simulator }: GraphicsProps) {
  const { speed, time, throttle } = simulator;

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card>
        <Chart
          title={'Speed: ' + Math.floor(speed)}
          currentValue={{ id: time, value: speed }}
          min={0}
          max={230}
        />
      </Card>
      <Card>
        <Chart
          title={'Throttle: ' + throttle}
          currentValue={{ id: time, value: throttle }}
          min={0}
          max={100}
        />
      </Card>
    </Space>
  );
}
