import { Card, Radio, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import {
  INeuralNetworkState,
  INeuralNetworkTrainingData,
  ITrainStreamOptions,
  NeuralNetwork,
  NeuralNetworkInput,
  NeuralNetworkOutput,
  TrainStream,
} from 'brain.js/src/index';
import React, { useEffect, useRef, useState } from 'react';
import { SimulatorHook } from '../domain/use-simulator';
import { AiDiag } from './AiDiag';
import { TargetSpeedSetter } from './TargetSpeedSetter';

function normalizeError(error: number) {
  if (error > 50) {
    return 1;
  }
  if (error < -50) {
    return 0;
  }

  return (error + 50) / 100;
}

let done = false;

function detectThrottle(
  net: NeuralNetwork,
  currentError: number,
  initMode: boolean,
) {
  let minError = 100000;
  let bestThrottle = 0;
  const errors: number[] = [];

  for (let throttle = 0; throttle <= 100; throttle++) {
    const input: NeuralNetworkInput = [
      normalizeError(currentError),
      throttle / 100,
    ];
    const output = net.run(input);

    const error = Math.abs(output[0] - 0.5);
    if (error < minError) {
      minError = error;
      bestThrottle = throttle;
    }

    errors.push(error);
  }

  console.log('min error: ', minError, bestThrottle);
  // console.table(errors);

  if (initMode) {
    bestThrottle = Math.random() * 100;
  }

  return {
    throttle: bestThrottle,
    errors,
  };
}

function useAiPilot(
  simulator: SimulatorHook,
  targetSpeed: number,
  learningMode: LearningMode,
) {
  const trainingData = useRef<INeuralNetworkTrainingData[]>([]);
  const netRef = useRef<NeuralNetwork>(new NeuralNetwork());
  const errorsRef = useRef<number[]>([]);

  const lastStateRef = useRef({
    error: 0,
    throttleToBeApplied: 0,
  });

  useEffect(() => {
    const lastState = lastStateRef.current!;
    const currentError = targetSpeed - simulator.speed;
    const data: INeuralNetworkTrainingData = {
      input: [
        normalizeError(lastState.error ?? 0),
        lastState.throttleToBeApplied / 100,
      ],
      output: [normalizeError(currentError)],
    };

    console.log(data.input, data.output[0]);

    if (
      learningMode === LearningMode.explore ||
      learningMode === LearningMode.continuous
    ) {
      trainingData.current.push(data);
      netRef.current.train(trainingData.current, {
        errorThresh: 0.005,
      });
    }

    const { throttle, errors } = detectThrottle(
      netRef.current!,
      currentError,
      learningMode === LearningMode.explore,
    );

    errorsRef.current = errors;

    lastStateRef.current = {
      error: currentError,
      throttleToBeApplied: throttle,
    };

    simulator.setThrottle(throttle);
  }, [simulator.simTime]);

  return { errors: errorsRef.current, dataPoints: trainingData.current.length };
}

enum LearningMode {
  explore = 1,
  continuous = 2,
  off = 3,
}

interface AiPilotProps {
  simulator: SimulatorHook;
}
export function AiPilot({ simulator }: AiPilotProps) {
  const { speed, simTime: time } = simulator;

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
