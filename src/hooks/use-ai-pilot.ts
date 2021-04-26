import {
  INeuralNetworkTrainingData,
  NeuralNetwork,
  NeuralNetworkInput,
} from 'brain.js/src/index';
import { useEffect, useRef } from 'react';
import { SimulatorHook } from './use-simulator';

export enum LearningMode {
  explore = 1,
  continuous = 2,
  off = 3,
}

function normalizeError(error: number) {
  if (error > 50) {
    return 1;
  }
  if (error < -50) {
    return 0;
  }

  return (error + 50) / 100;
}

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

  if (initMode) {
    bestThrottle = Math.random() * 100;
  }

  return {
    throttle: bestThrottle,
    errors,
  };
}

export function useAiPilot(
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
    const lastState = lastStateRef.current;
    const currentError = targetSpeed - simulator.speed;
    const data: INeuralNetworkTrainingData = {
      input: [
        normalizeError(lastState.error),
        lastState.throttleToBeApplied / 100,
      ],
      output: [normalizeError(currentError)],
    };

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
