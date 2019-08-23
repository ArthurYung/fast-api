const myDBName = "fast_api_timer";
const StoreName = "history";
const keyPath = "id";
let connectStatus: number = 0; // DB连接状态
let currentDB: IDBDatabase | null; // 当前db名称
let awaitRequestQueue: Function[] = [];

const log = function(message: string, type: string = "success"): void {
  const ColorMap: { [x: string]: string } = {
    success: "green",
    error: "red",
    info: "blue",
    not: "gray"
  };
  const color = ColorMap[type] || "gray";
  console.log(`%c ${message}`, `color: ${color}`);
};

const rejectPromise = Promise.reject({ error: "您的浏览器不支持indexDB" });

if (!window.indexedDB) {
  connectStatus = -1;
  log("您的浏览器暂不支持IndexDB", "not");
}

function _execRequestQueue() {
  awaitRequestQueue.forEach(fn => {
    fn();
  });
  awaitRequestQueue = [];
}

function initDB(name: string = myDBName) {
  if (connectStatus === -1) return;
  const connect = window.indexedDB.open(name);
  connect.onsuccess = function() {
    log("成功连接数据库: " + name);
    connectStatus = 1;
    currentDB = this.result;
    _execRequestQueue();
  };
  connect.onerror = function() {
    connectStatus = -1;
    log("连接数据库失败", "error");
  };
  connect.onupgradeneeded = function() {
    connectStatus = 2;
    currentDB = this.result;

    if (!currentDB.objectStoreNames.contains(StoreName)) {
      currentDB.createObjectStore(StoreName, { keyPath: keyPath });
      log("成功建立对象存储空间：" + StoreName);
    }
    _execRequestQueue();
  };
}

function addData(): Promise<any> {
  if (connectStatus === -1) {
    return rejectPromise;
  }
  return new Promise((resolve, reject) => {});
}
