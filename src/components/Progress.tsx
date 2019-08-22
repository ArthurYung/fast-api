import React from "react";
import connect from "@/container/progress";

const Progress: React.FC<{ progress: boolean }> = props => {
  return (
    <article className="app-progress">
      {props.progress && <div className="app-progress-bar" />}
    </article>
  );
};

export default connect(Progress);
