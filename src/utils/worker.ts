// eslint-disable-next-line
const MyWorker: any = require("worker-loader!../worker/init.worker.js");

const worker = new MyWorker();
worker.postMessage({ msg: "hello" });
worker.onmessage = function(e: any) {
  console.log(e);
};
export default worker;
