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

export interface TimerDataInfo {
  id: number;
  name: string;
  useTime: number;
  status: number;
  date?: number;
  children: TimerDataInfo[];
}
