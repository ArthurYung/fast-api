import { TimerDataInfo } from "./types";

interface TimerInfo {
  id: number;
  name: string;
  root: boolean;
  startTime: number;
  endTime: number;
  parentId: number | null;
  status: number; // 0 - info, 1: success, 2: error
  children: number[];
}

let id: number = 0;
const timerTree: { [x: number]: TimerInfo } = {};

function beginTimer(name: string, root: number | boolean): number {
  id++;
  const timerId = id;
  const isRoot = root === true;
  const timerInfo = {} as TimerInfo;
  timerInfo.name = name;
  timerInfo.root = isRoot;
  timerInfo.startTime = window.performance.now();
  timerInfo.parentId = isRoot ? null : (root as number);
  timerInfo.status = 0;
  timerInfo.children = [];
  timerInfo.id = timerId;

  timerTree[timerId] = timerInfo;
  return timerId;
}

function endTimer(id: number, isError?: boolean): void | TimerDataInfo {
  const currentInfo: TimerInfo = timerTree[id];
  const nowTime = window.performance.now();

  if (isError) {
    currentInfo.status = 2;
    return;
  }

  if (currentInfo.status === 0) {
    currentInfo.status = 1;
  }

  currentInfo.endTime = nowTime;

  if (currentInfo.parentId) {
    timerTree[currentInfo.parentId].children.push(id);
  }

  if (currentInfo.root) {
    return __getHandleTimerData(id);
  }
}

function __getHandleTimerData(id: number): TimerDataInfo {
  const getDataInfo = (id: number): TimerDataInfo => {
    const info = { ...timerTree[id] };
    const dataInfo = {} as TimerDataInfo;
    const children = info.children.map((id: number) => {
      return getDataInfo(id);
    });

    dataInfo.id = id;
    dataInfo.name = info.name;
    dataInfo.status = info.status;
    dataInfo.useTime = info.endTime - info.startTime;
    dataInfo.children = children;
    dataInfo.date = Date.now();
    delete timerTree[id];
    return dataInfo;
  };
  return getDataInfo(id);
}

export { beginTimer, endTimer };
