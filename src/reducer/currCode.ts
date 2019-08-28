import { SetCurrInfoActionType, CURRENT_CODE } from "../actions/history";
import { DatabaseCodeInfo } from "../utils/types";

export default function progress(
  state: DatabaseCodeInfo | null = null,
  action: SetCurrInfoActionType
) {
  switch (action.type) {
    case CURRENT_CODE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
