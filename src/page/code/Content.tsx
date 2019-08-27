import React from "react";
import Button from "@material-ui/core/Button";
import Replay from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography";
import Editor from "@/components/Editor";

import getTransformCode from "@/utils/codeTransform";
import { beginTimer, start, end, getData } from "@/utils/codeTimer";

const initCodeRefValue = `
let i = 0;
function jacs() {
  i++
}
const testFun = (d) => {
  return d + 1
}

const j = function(){}

`;

export default class CodeTest extends React.Component {
  codeRef: any;
  state: {
    toES5: boolean;
    initCodeRefValue: string;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      toES5: false,
      initCodeRefValue: initCodeRefValue,
    };
    this.codeRef = React.createRef();
  }
  runCurrentApiTest() {
    const results = getTransformCode(this.codeRef.current.getEditorValue());
    if (results.code) {
      const fun = new Function("__start", "__end", results.code);
      beginTimer(results.id, (data) => console.log(data));
      try {
        fun(start, end);
      } catch (e) {
        //console.log(e);
      }

      const result = getData();
    }
  }
  render() {
    return (
      <article className="code-main">
        <section>
          <div className="component-title">Edit Custom Code</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.runCurrentApiTest()}
          >
            Run Test
            <Replay />
          </Button>
        </section>
        <section>
          <Typography variant="subtitle1" gutterBottom>
            Code under test:
          </Typography>
          <div>
            <Editor ref={this.codeRef} value={this.state.initCodeRefValue} />
          </div>
        </section>
      </article>
    );
  }
}
