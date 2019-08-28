import { ProcessTimerInfo, CodeTimerData } from "./types";

let currentTimerId: string;
let stampTimerPool: { [x: string]: ProcessTimerInfo } = {};
let watchTimerEnd: boolean = false;
let watcherCallback: (x: CodeTimerData) => void; // 监听收集数据后异步函数的回调函数

let uid = 0;

function getUid() {
  return ++uid + "";
}

function beginTimer(_gid: string, callback: (x: CodeTimerData) => void) {
  currentTimerId = _gid;

  stampTimerPool = {};

  watchTimerEnd = false;

  watcherCallback = callback;
}

function start(_tid: string, _gid: string): string {
  if (currentTimerId !== _gid) return "-1";

  const _uid = getUid();

  const now = window.performance.now();

  stampTimerPool[_uid] = {
    _tid: _tid,
    _gid: _gid,
    start: now,
    end: 0,
    async: watchTimerEnd
  };

  return _uid;
}

function end(_tid: string, _gid: string, _uid: string) {
  if (currentTimerId !== _gid) return;

  const now = window.performance.now();

  stampTimerPool[_uid].end = now;

  watchTimerEnd && watcherCallback(getData());
}

function getData(): CodeTimerData {
  watchTimerEnd = true; // 监听收集数据后异步函数的回调

  const codeTimerData: any = createCodeTimerData(currentTimerId);
  
  Object.keys(stampTimerPool).forEach((_uid: string) => {
    const { end, start, _tid, async } = stampTimerPool[_uid];

    if (end >= start) {
      const time = end - start;

      async
        ? codeTimerData.addAsyncTime(time, _tid)
        : codeTimerData.addTime(time, _tid);
    }
  });

  return codeTimerData.getData();
}

function createCodeTimerData(_gid: string) {
  const codeTimerData: CodeTimerData = {
    id: _gid,
    time: 0,
    child: {},
    async: {}
  };

  function addTime(time: number, _tid: string) {
    if (_tid === _gid) {
      codeTimerData.time = time;
    } else {
      codeTimerData.child[_tid] = time;
    }
  }

  function addAsyncTime(time: number, _tid: string) {
    if (_tid === _gid) {
      codeTimerData.time = time;
    } else {
      codeTimerData.async[_tid] = time;
    }
  }

  function getData() {
    return codeTimerData;
  }

  return {
    addTime,
    addAsyncTime,
    getData
  };
}

export { beginTimer, start, end, getData };
