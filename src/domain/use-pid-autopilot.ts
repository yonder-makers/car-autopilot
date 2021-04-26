import { useCallback, useEffect, useState } from 'react';
import { INTERVAL, SimulatorHook } from './use-simulator';

interface AutopilotState {
  error: number;
  integral: number;
  derivative: number;
  output: number;
  config: PidConfig;
}

export interface PidConfig {
  p: number;
  i: number;
  d: number;
}

export interface AutopilotHook extends AutopilotState {
  setCoeficients(config: PidConfig): void;
}

const TIME_DIFF = INTERVAL / 1000;

export function usePidAutopilot(
  simulator: SimulatorHook,
  targetSpeed: number,
): AutopilotHook {
  const [state, setState] = useState<AutopilotState>({
    error: 0,
    integral: 0,
    derivative: 0,
    output: 0,
    config: {
      d: 1,
      i: 1,
      p: 1,
    },
  });

  useEffect(() => {
    const config = state.config;
    const error = targetSpeed - simulator.speed;
    const integral = state.integral + error * TIME_DIFF;
    const derivative = (error - state.error) / TIME_DIFF;
    const output =
      config.p * error + config.i * integral + config.d * derivative;

    setState((oldState) => {
      return { ...oldState, error, integral, derivative, output };
    });
  }, [simulator.simTime]);

  useEffect(() => {
    simulator.setThrottle(Math.min(100, Math.max(0, state.output)));
  }, [state.output]);

  const setCoeficients = useCallback(
    (config: PidConfig) => {
      setState((oldState) => {
        return { ...oldState, config };
      });
    },
    [setState],
  );

  return {
    ...state,
    setCoeficients,
  };
}
