import { Button, Card, Col, Radio, Row, Slider, Space } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import { Chart } from './Chart';
import { SimulatorHook, useSimulator } from './domain/use-simulator';
import { throttle as _throttle } from 'lodash';
import { differenceInSeconds } from 'date-fns';

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

interface AdjustTimeState {
  startTime: Date;
  endTime?: Date;
  hitCount: number;
}
function useAdjustTime(
  targetSpeed: number,
  currentSpeed: number,
  simTime: number,
) {
  const [state, setState] = useState<AdjustTimeState>({
    startTime: new Date(),
    hitCount: 0,
  });

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        startTime: new Date(),
        endTime: undefined,
        hitCount: 0,
      };
    });
  }, [targetSpeed]);

  useEffect(() => {
    if (Math.abs(targetSpeed - currentSpeed) < 2) {
      setState((oldState) => {
        const newState = {
          ...oldState,
          hitCount: oldState.hitCount + 1,
        };
        if (newState.hitCount === 1) {
          newState.endTime = new Date();
        }

        return newState;
      });
    } else if (state.hitCount > 0) {
      setState((oldState) => {
        return { ...oldState, endTime: undefined, hitCount: 0 };
      });
    }
  }, [simTime]);

  const adjustingTime = useMemo(() => {
    if (state.endTime) {
      return differenceInSeconds(state.endTime, state.startTime);
    }

    return differenceInSeconds(new Date(), state.startTime);
  }, [simTime]);
  return { adjustingTime, hitCount: state.hitCount };
}

interface AutoPilotProps {
  simulator: SimulatorHook;
}
function AutoPilot({ simulator }: AutoPilotProps) {
  const { speed, time, throttle, setThrottle } = simulator;

  const [targetSpeed, setTargetSpeed] = useState(Math.floor(speed));

  const { adjustingTime, hitCount } = useAdjustTime(targetSpeed, speed, time);

  useEffect(() => {
    if (speed > targetSpeed) {
      setThrottle(0);
    } else if (speed < targetSpeed) {
      setThrottle(100);
    }
  }, [time]);

  return (
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
        <Button onClick={() => setTargetSpeed(90)}>90</Button>
        <Button onClick={() => setTargetSpeed(130)}>130</Button>
      </Space>
      <div>
        Adjusting time: {adjustingTime}{' '}
        {hitCount && <span>(hit: {hitCount})</span>}
      </div>
    </Card>
  );
}

interface EnvironmentProps {
  simulator: SimulatorHook;
}
function Environment({ simulator }: EnvironmentProps) {
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
