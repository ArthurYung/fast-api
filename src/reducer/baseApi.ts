import { ADD_TODO } from "@/actions/home";

interface testAction {
  type: ADD_TODO;
  text: string;
}
export default function baseApi(state: string[] = [], action: testAction) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}
