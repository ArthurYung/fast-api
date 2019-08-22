export interface BaseApiInfo {
  name: string;
  fn: Function;
  baseCode: string;
  initCode: string;
  loop: boolean;
  root: string | undefined;
  id: number;
  key: string;
  expression: string | undefined;
}

export interface TimerInfo<T = number> {
  id: number;
  name: string;
  root: boolean;
  startTime: number;
  endTime: number;
  parentId: number | null;
  status: number; // 0 - info, 1: success, 2: error
  children: T[];
  useTime: number;
  date: number;
}
