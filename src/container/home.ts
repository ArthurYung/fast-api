import { connect } from "react-redux";

export default connect(
  (state: any) => ({ test: state.baseApi }),
  dispatch => ({
    add() {
      dispatch({ type: "ADD_TODO", text: "ganbadie" });
    }
  })
);
