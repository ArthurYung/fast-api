import { connect } from "react-redux";

export default connect((state: any) => ({ progress: state.progress }));
