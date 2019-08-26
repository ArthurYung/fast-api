import { ProcessTimerInfo, TransformData } from "./types";

let currentTimerId: string;
let stampTimerPool: { [x: string]: ProcessTimerInfo } = {};
let watchTimerEnd: boolean = false;
let watcherCallback: (x: TransformData) => void;

let uid = 0;

function getUid() {
  return ++uid + "";
}

function beginTimer(_gid: string, callback: (x: TransformData) => void) {
  currentTimerId = _gid;

  stampTimerPool = {};

  watchTimerEnd = false;

  watcherCallback = callback;
}

function start(_tid: string, _gid: string): string {
  if (currentTimerId !== _gid) return "-1";

  const _uid = getUid();

  const _now = window.performance.now();

  stampTimerPool[_uid] = {
    _tid: _tid,
    _gid: _gid,
    start: _now,
    end: 0,
    async: watchTimerEnd,
  };

  return _uid;
}

function end(_tid: string, _gid: string, _uid: string) {
  if (currentTimerId !== _gid) return;

  const now = window.performance.now();

  stampTimerPool[_uid].end = now;

  watchTimerEnd && watcherCallback(getData());
}

function getData(): TransformData {
  watchTimerEnd = true; // 监听收集数据后异步函数的回调

  const transformData: any = createTransformData(currentTimerId);

  Object.keys(stampTimerPool).forEach((_uid: string) => {
    const { end, start, _tid, async } = stampTimerPool[_uid];
    if (end >= start) {
      const time = start - end;
      async
        ? transformData.addAsyncTime(time, _tid)
        : transformData.addTime(time, _tid);
    }
  });

  return transformData.getData();
}

function createTransformData(_gid: string) {
  const transformData: TransformData = {
    id: _gid,
    time: 0,
    child: {},
    async: {},
  };

  function addTime(time: number, _tid: string) {
    if (_tid === _gid) {
      transformData.time = time;
    } else {
      transformData.child[_tid] = time;
    }
  }

  function addAsyncTime(time: number, _tid: string) {
    if (_tid === _gid) {
      transformData.time = time;
    } else {
      transformData.async[_tid] = time;
    }
  }

  function getData() {
    return transformData;
  }

  return {
    addTime,
    addAsyncTime,
    getData,
  };
}

export { beginTimer, start, end, getData };
