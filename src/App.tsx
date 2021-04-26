import { Col, Row } from 'antd';
import React from 'react';
import './App.css';
import { ControlPanel } from './components/ControlPanel';
import { Environment } from './components/Environment';
import { Graphics } from './components/Graphics';
import { useSimulator } from './hooks/use-simulator';

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
