export type Clockfaces = {
    id: number;
    label: string;
    limit: number;
    vl: number
}

export type DelayIds = {
    intervalId: number;
    timeoutId: number;
  }

export type ClockFaceData = {
    clockfaces: Clockfaces[],
    setDelayId: DelayIds,
    actionName: string
}