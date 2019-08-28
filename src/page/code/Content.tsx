import React from "react";
import Button from "@material-ui/core/Button";
import Replay from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography";
import Editor from "@/components/Editor";
import { TransformInfo, CodeTimerData, DatabaseCodeInfo } from "@/utils/types";
import { TimerDataInfo, ChangeTimerInfo, TimerChild } from "@/actions/history";
import getTransformCode from "@/utils/codeTransform";
import * as codeTimer from "@/utils/codeTimer";
import { setCodeInfoCache, getCodeInfoName } from "@/utils/codeInfoCache";
import connect from "@/container/code";

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

type StringObject = { [x: string]: number };

function getChildrenData(
  id: string,
  child: StringObject,
  async: StringObject
): TimerChild[] {
  const syncChild: TimerChild[] = Object.keys(child).map((key: string) => ({
    name: getCodeInfoName(id, key),
    time: child[key],
    async: false
  }));

  const asyncChild: TimerChild[] = Object.keys(async).map((key: string) => ({
    name: getCodeInfoName(id, key),
    time: async[key],
    async: true
  }));

  return syncChild.concat(asyncChild);
}

interface CodeTestProps {
  progress: boolean;
  updateProgress: (x: boolean) => void;
  updateHistoryTimer: (x: TimerDataInfo) => void;
  changeHistoryTimer: (x: ChangeTimerInfo) => void;
  currCode: DatabaseCodeInfo;
}

class CodeTest extends React.Component<CodeTestProps> {
  codeRef: any;
  state: {
    toES5: boolean;
    initCodeRefValue: string;
  };

  constructor(props: CodeTestProps) {
    super(props);
    this.state = {
      toES5: false,
      initCodeRefValue:
        props.currCode && props.currCode.type === 3
          ? props.currCode.baseCode
          : initCodeRefValue
    };
    this.codeRef = React.createRef();
  }
  shouldComponentUpdate(nextProps: CodeTestProps) {
    if (nextProps === this.props) return true;
    if (nextProps.currCode) {
      this.codeRef.current.resetCode(nextProps.currCode.baseCode as string);
    }
    return true;
  }

  runCurrentApiTest() {
    if (this.props.progress) return;
    this.props.updateProgress(true);
    const userCode = this.codeRef.current.getEditorValue();
    const transformData = getTransformCode(userCode);
    setTimeout(() => {
      if (transformData.code) {
        let error = null;
        // eslint-disable-next-line
        const fun = new Function("__start", "__end", transformData.code);
        codeTimer.beginTimer(
          transformData.id,
          this.TimerDataWatcher.bind(this)
        );

        try {
          fun(codeTimer.start, codeTimer.end);
        } catch (e) {
          error = e.message;
        }

        const result = codeTimer.getData();
        if (error) {
          result.error = error;
        }
        this.setCodeInfoCache(transformData, userCode);
        this.initTimerData(result);
        this.props.updateProgress(false);
      }
    }, 300);
  }
  initTimerData(data: CodeTimerData) {
    const timerData: TimerDataInfo = {
      id: data.id,
      uid: data.id,
      name: "Code Test",
      status: data.error ? 2 : 1,
      error: data.error,
      startTime: 0,
      endTime: 0,
      children: [],
      useTime: data.time,
      date: Date.now()
    };
    timerData.children = getChildrenData(data.id, data.child, data.async);
    this.props.updateHistoryTimer(timerData);
  }
  TimerDataWatcher(data: CodeTimerData) {
    const changeInfo = {
      id: data.id,
      children: getChildrenData(data.id, data.child, data.async)
    };
    this.props.changeHistoryTimer(changeInfo);
  }
  setCodeInfoCache(info: TransformInfo, userCode: string) {
    const codeInfo = {
      id: info.id,
      baseCode: userCode,
      type: 3,
      name: "Code Test"
    };
    setCodeInfoCache(codeInfo, info.nameMap);
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

export default connect(CodeTest);
