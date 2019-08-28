import { TimerInfo } from "./types";

/**
 * api测试打点简单，只需要插入一次打点，不需要介入ast遍历
 */

let _uid: number = 0;
let tempTimer: { [x: string]: defineApiInfo } = {};

interface defineApiInfo {
  id: string;
  startTime: number;
  endTime: number;
  useTime: number;
  name: string;
  date: number;
  status: number;
  uid: string;
  error?: string;
}

/**
 * 创建一个唯一id
 */
function createUid(): string {
  return ++_uid + "";
}

/**
 * 清除之前工作树
 */
function clearEmptyTimer() {
  tempTimer = {};
}

/**
 * 初始化一个Timer Object
 */
function __initApiInfo(uid: string): defineApiInfo {
  const currId = createUid();
  const date = Date.now();
  tempTimer[currId] = {
    name: "",
    startTime: 0,
    endTime: 0,
    useTime: 0,
    status: 0,
    date,
    id: currId,
    uid
  };

  return tempTimer[currId];
}

/**
 * 补充timerInfo结构以便使用
 */
function __parseTimerInfo(info: defineApiInfo): TimerInfo {
  return {
    ...info,
    children: []
  };
}

/**
 * 开始计时
 */
function beginTimer(name: string, uid: string): string {
  clearEmptyTimer();

  const timerInfo = __initApiInfo(uid);

  timerInfo.name = name;
  timerInfo.startTime = window.performance.now();

  return timerInfo.id;
}

/**
 * 错误情况
 */
function runError(id: string, message: string) {
  if (tempTimer[id]) {
    tempTimer[id].status = 2;
    tempTimer[id].error = message;
  }
}

/**
 * 结束计时
 */
function endTimer(id: string): TimerInfo {
  const timerInfo: defineApiInfo = tempTimer[id];

  timerInfo.endTime = window.performance.now();
  timerInfo.useTime = timerInfo.endTime - timerInfo.startTime;

  if (timerInfo.status === 0) {
    timerInfo.status = 1;
  }

  return __parseTimerInfo(timerInfo);
}

export { beginTimer, endTimer, runError };
