// eslint-disable-next-line
const MyWorker: any = require("worker-loader!../worker/worker.js");

type CallBackInfo = {
  fn: (e: any) => void;
  id: number;
};

let watcherId = 0;

let watchers: CallBackInfo[] = [];

let tests: any[] = [];

const worker = new MyWorker();

function timer(id: number, uid: number, qid: number) {
  const time = performance.now();
  tests.push({
    id,
    uid,
    qid,
    time,
  });
}

console.time("newStart");
for (let i = 0; i < 5000; i++) {
  timer(i, i, i);
}
console.timeEnd("newStart");

console.time("start");
for (let i = 0; i < 5000; i++) {
  postMessage(i);
}
console.timeEnd("start");

worker.onmessage = function(e: any) {
  watchers.forEach((callbackInfo: CallBackInfo) => {
    callbackInfo.fn(e);
  });
};

function postMessage(data: any) {
  worker.postMessage(data);
}

function addWorkerWatcher(callback: (e: any) => void) {
  const id = ++watcherId;
  watchers.push({ id, fn: callback });
  console.log("hehe");
}

function removeWorkerWatcher(id: number) {
  watchers = watchers.filter(
    (callbackInfo: CallBackInfo) => callbackInfo.id !== id
  );
}

export { postMessage, addWorkerWatcher, removeWorkerWatcher };
