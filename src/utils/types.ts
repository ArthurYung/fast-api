export type SyncReturn = Promise<{ data?: any; error?: ErrorEvent | string }>;

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
  root: boolean;
  startTime: number;
  endTime: number;
  parentId: string | null;
  status: number; // 0 - info, 1: success, 2: error
  children: TimerInfo[];
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
}

export interface ProcessTimerInfo {
  _tid: string;
  _gid: string;
  start: number;
  end: number;
  async: boolean;
}

export interface TransformData {
  id: string;
  time: number;
  child: { [x: string]: number };
  async: { [x: string]: number };
}
