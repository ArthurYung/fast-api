export type SyncReturn = Promise<{ data?: any; error?: ErrorEvent | string }>;

export type WatcherFunction<T> = (x: string, params: T) => void;

export interface TimerChildInfo {
  name: string;
  time: number;
  async: boolean;
}
export interface BaseApiInfo {
  name: string;
  fn: Function;
  baseCode: string;
  initCode: string;
  loop: boolean;
  root: string | undefined;
  id: string;
  key: string;
  type: number;
  expression: string | undefined;
}

export interface TimerInfo {
  saved?: boolean;
  uid: string;
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  status: number; // 0 - info, 1: success, 2: error
  children: TimerChildInfo[];
  useTime: number;
  date: number;
  error?: string;
}

export interface DatabaseCodeInfo {
  name: string;
  baseCode: string;
  initCode?: string;
  loop?: boolean;
  root?: string;
  id: string;
  key?: string;
  expression?: string;
  type: number;
}

export interface DatabaseItem {
  id?: string;
  codeInfo: DatabaseCodeInfo;
  timerInfo: TimerInfo;
  type: number;
  liked: boolean;
}

export interface ProcessTimerInfo {
  _tid: string;
  _gid: string;
  start: number;
  end: number;
  async: boolean;
}

export interface CodeTimerData {
  id: string;
  time: number;
  child: { [x: string]: number };
  async: { [x: string]: number };
  error?: string;
}

type FuncNameMap = { [x: string]: string };
export interface TransformInfo {
  id: string;
  code: string | null | undefined;
  nameMap: FuncNameMap;
}
