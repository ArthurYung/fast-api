export interface BaseApiInfo {
  name: string;
  fn: Function;
  baseCode: string;
  initCode: string;
  loop: boolean;
  root: string | undefined;
  id: string;
  key: string;
  expression: string | undefined;
}

export interface TimerInfo {
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
