export const ADD_TODO = "ADD_TODO";
export type ADD_TODO = typeof ADD_TODO;

export const PROGRESS_STATUS = "PROGRESS_STATUS";
export type PROGRESS_STATUS = typeof PROGRESS_STATUS;

export interface UpdateProgress {
  type: PROGRESS_STATUS;
  payload: boolean;
}

export function UpdateProgress(status: boolean): UpdateProgress {
  return {
    type: PROGRESS_STATUS,
    payload: status
  };
}
