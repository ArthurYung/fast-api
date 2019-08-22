import { TimerInfo } from "./types";

let _uid: number = 0;
let tempTimerTree: { [x: number]: TimerInfo } = {};

function createUid(): number {
  _uid++;
  return _uid;
}

function __initTimerInfo(): TimerInfo {
  const currId = createUid();
  const date = Date.now();
  tempTimerTree[currId] = {
    name: "",
    root: true,
    startTime: 0,
    endTime: 0,
    useTime: 0,
    status: 0,
    date,
    parentId: null,
    children: [],
    id: currId,
  };

  return tempTimerTree[currId];
}

function __getHandleTimerData(id: number): TimerInfo<any> {
  const getTimerInfo = (_id: number): TimerInfo<any> => {
    const timerInfo: TimerInfo<any> = { ...tempTimerTree[_id] };
    const { startTime, endTime, children } = timerInfo;

    timerInfo.useTime = endTime - startTime;

    timerInfo.children = children.map((__id: number) => getTimerInfo(__id));

    delete tempTimerTree[id];
    return timerInfo;
  };

  return getTimerInfo(id);
}

interface beginTimerProps {
  n: string;
  r: boolean;
  p?: number;
}

function beginTimer({ n, r, p }: beginTimerProps): number {
  const timerInfo = __initTimerInfo();

  timerInfo.name = n;
  timerInfo.root = r;
  timerInfo.startTime = window.performance.now();
  timerInfo.parentId = p || null;

  return timerInfo.id;
}

function runError(id: number) {
  if (tempTimerTree[id]) {
    tempTimerTree[id].status = 2;
  }
}

function endTimer(id: number): void | TimerInfo<any> {
  const timerInfo: TimerInfo = tempTimerTree[id];

  timerInfo.endTime = window.performance.now();

  if (timerInfo.status === 0) {
    timerInfo.status = 1;
  }

  if (timerInfo.parentId) {
    tempTimerTree[timerInfo.parentId].children.push(id);
  }

  if (timerInfo.root) {
    return __getHandleTimerData(id);
  }
}

export { beginTimer, endTimer, runError };
