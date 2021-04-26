import { Card, Radio, Space } from 'antd';
import React, { useState } from 'react';
import { LearningMode, useAiPilot } from '../hooks/use-ai-pilot';
import { SimulatorHook } from '../hooks/use-simulator';
import { AiDiag } from './AiDiag';
import { TargetSpeedSetter } from './TargetSpeedSetter';

interface AiPilotProps {
  simulator: SimulatorHook;
}
export function AiPilot({ simulator }: AiPilotProps) {
  const [targetSpeed, setTargetSpeed] = useState(70);
  const [learningMode, setLearningMode] = useState<LearningMode>(
    LearningMode.explore,
  );

  const { errors, dataPoints } = useAiPilot(
    simulator,
    targetSpeed,
    learningMode,
  );

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card title="Autopilot">
        <TargetSpeedSetter
          changeSpeed={setTargetSpeed}
          targetSpeed={targetSpeed}
        ></TargetSpeedSetter>

        <Radio.Group
          onChange={(e) => setLearningMode(e.target.value)}
          value={learningMode}
        >
          <Radio value={LearningMode.explore}>Explore</Radio>
          <Radio value={LearningMode.continuous}>Continuous learning</Radio>
          <Radio value={LearningMode.off}>Learning off</Radio>
        </Radio.Group>
      </Card>
      <Card>Data points: {dataPoints}</Card>
      <Card>
        <AiDiag expectedErrors={errors} />
      </Card>
    </Space>
  );
}
