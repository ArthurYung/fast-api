import { log } from "./common";
import { DatabaseItem } from "./types";

const StoreName = "history";
const keyPath = "id";
const DBName = "fast_api_timer";
let connectStatus: number = 0; // DB连接状态
let currentDB: IDBDatabase | null; // 当前db名称
let awaitRequestQueue: Function[] = [];

const returnReject = () =>
  Promise.reject({
    error: "IndexDB is not supported by your browser",
  });

if (!window.indexedDB) {
  connectStatus = -1;
  log("IndexDB is not supported by your browser", "not");
}

function _execRequestQueue() {
  awaitRequestQueue.forEach((fn) => {
    fn();
  });
  awaitRequestQueue = [];
}

function _pushRequestQueue(fn: Function) {
  awaitRequestQueue.push(fn);
}

function initDB() {
  if (connectStatus === -1) return;
  const connect = window.indexedDB.open(DBName);
  connect.onsuccess = function() {
    log("connect success: " + DBName);
    connectStatus = 1;
    currentDB = this.result;
    _execRequestQueue();
  };
  connect.onerror = function() {
    connectStatus = -1;
    log("connect error", "error");
  };
  connect.onupgradeneeded = function() {
    connectStatus = 2;
    currentDB = this.result;

    if (!currentDB.objectStoreNames.contains(StoreName)) {
      currentDB.createObjectStore(StoreName, {
        autoIncrement: true,
        keyPath: keyPath,
      });
      log("create success of objectStore: " + StoreName);
    }
    _execRequestQueue();
  };
}

function _getTransactionStore(): IDBObjectStore {
  return (currentDB as IDBDatabase)
    .transaction([StoreName], "readwrite")
    .objectStore(StoreName);
}

function addData(databaseItem: DatabaseItem): Promise<any> {
  log("addData", "info");
  if (connectStatus === -1) {
    return returnReject();
  }
  return new Promise((resolve, reject) => {
    const awaitFn = () => {
      const objectStore = _getTransactionStore();
      const request = objectStore.add(databaseItem);
      request.onsuccess = function(e: Event) {
        resolve({ data: (e.target as IDBRequest).result });
      };
      request.onerror = function(e: Event) {
        reject({ error: e });
      };
    };
    if (connectStatus === 0) {
      _pushRequestQueue(awaitFn);
    } else {
      awaitFn();
    }
  });
}

function deleteData(id: string): Promise<any> {
  log("deleteData", "info");
  if (connectStatus === -1) {
    return returnReject();
  }
  return new Promise((resolve, reject) => {
    const awaitFn = () => {
      const objectStore = _getTransactionStore();
      const request = objectStore.delete(id);
      request.onsuccess = function(e: Event) {
        resolve({ data: (e.target as IDBRequest).result });
      };
      request.onerror = function(e: Event) {
        reject({ error: e });
      };
    };
    if (connectStatus === 0) {
      _pushRequestQueue(awaitFn);
    } else {
      awaitFn();
    }
  });
}

function getData(id: string): Promise<any> {
  log("getData", "info");
  if (connectStatus === -1) {
    return returnReject();
  }
  return new Promise((resolve, reject) => {
    const awaitFn = () => {
      const objectStore = _getTransactionStore();
      const request = objectStore.get(id);
      request.onsuccess = function(e: Event) {
        resolve({ data: (e.target as IDBRequest).result });
      };
      request.onerror = function(e: Event) {
        reject({ error: e });
      };
    };
    if (connectStatus === 0) {
      _pushRequestQueue(awaitFn);
    } else {
      awaitFn();
    }
  });
}

function getAllData(): Promise<any> {
  log("getData", "info");
  if (connectStatus === -1) {
    return returnReject();
  }
  return new Promise((resolve, reject) => {
    const awaitFn = () => {
      const objectStore = _getTransactionStore();
      const request = objectStore.getAll();
      request.onsuccess = function(e: Event) {
        resolve({ data: (e.target as IDBRequest).result });
      };
      request.onerror = function(e: Event) {
        reject({ error: e });
      };
    };
    if (connectStatus === 0) {
      _pushRequestQueue(awaitFn);
    } else {
      awaitFn();
    }
  });
}

export { initDB, addData, deleteData, getData, getAllData };
