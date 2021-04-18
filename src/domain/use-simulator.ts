import { useEffect, useState } from 'react';

export interface Simulator {
  throttle: number;
  wind: number;
  angle: number;
  speed: number;
  time: number;
}

export const INTERVAL = 500;

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

function getThrottleImpact(speed: number, throttle: number) {
  return ((300 - speed) * throttle) / 600 / (1000 / INTERVAL);
}

let simulator: Simulator = {
  throttle: 100,
  angle: 0,
  speed: 0,
  time: 0,
  wind: 20,
};

export interface SimulatorHook extends Simulator {
  setThrottle(value: number): void;
  setWind(value: number): void;
  setAngle(value: number): void;
}
export function useSimulator(): SimulatorHook {
  const [data, setData] = useState<Simulator>(simulator);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((oldSim) => {
        const impact =
          getThrottleImpact(oldSim.speed, oldSim.throttle) -
          getOtherImpact() -
          getWindImpact(oldSim.speed, oldSim.wind) -
          getAngleImpact(oldSim.angle);

        return {
          ...oldSim,
          time: oldSim.time + 1,
          speed: Math.max(0, oldSim.speed + impact),
        };
      });
    }, INTERVAL);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

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

  return {
    ...data,
    setThrottle,
    setWind,
    setAngle,
  };
}
