import { differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

interface AdjustTimeState {
  startTime: Date;
  endTime?: Date;
  hitCount: number;
}
export function useAdjustTime(
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
