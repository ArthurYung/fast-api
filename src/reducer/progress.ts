import { PROGRESS_STATUS, UpdateProgress } from "../actions/home";

export default function progress(
  state: boolean = false,
  action: UpdateProgress
) {
  switch (action.type) {
    case PROGRESS_STATUS:
      return action.payload;
    default:
      return state;
  }
}
