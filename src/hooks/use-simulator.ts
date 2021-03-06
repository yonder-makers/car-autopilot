import { useEffect, useState } from 'react';

export interface Simulator {
  throttle: number;
  wind: number;
  angle: number;
  speed: number;
  simTime: number;
  horsePower: number;
  isPaused: boolean;
}

export const INTERVAL = 300;

function getWindImpact(speed: number, wind: number) {
  const cumulative = speed + wind;
  return (cumulative * cumulative) / 4000 / (1000 / INTERVAL);
}

function getOtherImpact() {
  return 2 / (1000 / INTERVAL);
}

function getAngleImpact(angle: number) {
  return angle / (1000 / INTERVAL);
}

function getThrottleImpact(
  horsePower: number,
  speed: number,
  throttle: number,
) {
  const power = 600 * (300 / horsePower);
  return ((300 - speed) * throttle) / power / (1000 / INTERVAL);
}

let simulator: Simulator = {
  throttle: 0,
  angle: 0,
  speed: 0,
  simTime: 0,
  wind: 20,
  horsePower: 200,
  isPaused: false,
};

export interface SimulatorHook extends Simulator {
  setThrottle(value: number): void;
  setWind(value: number): void;
  setAngle(value: number): void;
  setHorsePower(value: number): void;
  setIsPaused(value: boolean): void;
}
export function useSimulator(): SimulatorHook {
  const [data, setData] = useState<Simulator>(simulator);

  useEffect(() => {
    if (data.isPaused) {
      return undefined;
    }

    const interval = setInterval(() => {
      setData((oldSim) => {
        const impact =
          getThrottleImpact(oldSim.horsePower, oldSim.speed, oldSim.throttle) -
          getOtherImpact() -
          getWindImpact(oldSim.speed, oldSim.wind) -
          getAngleImpact(oldSim.angle);

        return {
          ...oldSim,
          simTime: oldSim.simTime + 1,
          speed: Math.max(0, oldSim.speed + impact),
        };
      });
    }, INTERVAL);

    return function cleanup() {
      clearInterval(interval);
    };
  }, [data.isPaused]);

  function setThrottle(value: number) {
    setData((oldSim) => {
      return {
        ...oldSim,
        throttle: value,
      };
    });
  }

  function setWind(value: number) {
    setData((oldSim) => {
      return {
        ...oldSim,
        wind: value,
      };
    });
  }

  function setAngle(value: number) {
    setData((oldSim) => {
      return {
        ...oldSim,
        angle: value,
      };
    });
  }

  function setHorsePower(value: number) {
    setData((oldSim) => {
      return {
        ...oldSim,
        horsePower: value,
      };
    });
  }

  function setIsPaused(value: boolean) {
    setData((oldSim) => {
      return {
        ...oldSim,
        isPaused: value,
      };
    });
  }

  return {
    ...data,
    setThrottle,
    setWind,
    setAngle,
    setHorsePower,
    setIsPaused,
  };
}
