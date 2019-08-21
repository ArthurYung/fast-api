import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import connect from "@/container/progress";

const Progress: React.FC<{ progress: boolean }> = (props) => {
  return (
    <aside className="app-progress">
      {props.progress && <LinearProgress className="app-progress-gpu" />}
    </aside>
  );
};

export default connect(Progress);
