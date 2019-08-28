import { DatabaseCodeInfo } from "@/utils/types";

export const HISTORY_RESULT = "HISTORY_RESULT";
export type HISTORY_RESULT = typeof HISTORY_RESULT;
export const DELETE_TIMER = "DELETE_TIMER";
export type DELETE_TIMER = typeof DELETE_TIMER;
export const PUSH_TIMER = "PUSH_TIMER";
export type PUSH_TIMER = typeof PUSH_TIMER;
export const CHANGE_TIMER = "CHANGE_TIMER";
export type CHANGE_TIMER = typeof CHANGE_TIMER;
export const CURRENT_CODE = "CURRENT_CODE";
export type CURRENT_CODE = typeof CURRENT_CODE;

export interface TimerChild {
  name: string;
  time: number;
  async: boolean;
}

export interface TimerDataInfo {
  saved?: boolean;
  uid: string;
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  status: number; // 0 - info, 1: success, 2: error
  children: TimerChild[];
  useTime: number;
  date: number;
  error?: string;
}

export interface ChangeTimerInfo {
  saved?: boolean;
  id: string;
  name?: string;
  root?: boolean;
  parentId?: string | null;
  status?: number; // 0 - info, 1: success, 2: error
  children?: TimerChild[];
  date?: number;
  error?: string;
}
export interface HistoryActionType {
  type: HISTORY_RESULT | DELETE_TIMER | PUSH_TIMER;
  payload: TimerDataInfo;
}

export interface ChangeHistoryActionType {
  type: CHANGE_TIMER;
  payload: ChangeTimerInfo;
}

export interface SetCurrInfoActionType {
  type: CURRENT_CODE;
  payload: DatabaseCodeInfo;
}

export function updateHistoryResultData(
  timerData: TimerDataInfo
): HistoryActionType {
  return {
    type: HISTORY_RESULT,
    payload: timerData
  };
}

export function deleteHistoryTimerData(
  timerData: TimerDataInfo
): HistoryActionType {
  return {
    type: DELETE_TIMER,
    payload: timerData
  };
}

export function pushHistoryTimer(timerData: TimerDataInfo): HistoryActionType {
  return {
    type: PUSH_TIMER,
    payload: timerData
  };
}

export function changeHistoryTimer(
  timerData: ChangeTimerInfo
): ChangeHistoryActionType {
  return {
    type: CHANGE_TIMER,
    payload: timerData
  };
}

export function setCurrentCodeInfo(
  codeInfo: DatabaseCodeInfo
): SetCurrInfoActionType {
  return {
    type: CURRENT_CODE,
    payload: codeInfo
  };
}
