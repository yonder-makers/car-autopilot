import { useEffect } from 'react';
import { SimulatorHook } from './use-simulator';

export function useAutopilot(simulator: SimulatorHook, targetSpeed: number) {
  useEffect(() => {
    if (simulator.speed > targetSpeed) {
      simulator.setThrottle(0);
    } else if (simulator.speed < targetSpeed) {
      simulator.setThrottle(100);
    }
  }, [simulator.time]);
}
