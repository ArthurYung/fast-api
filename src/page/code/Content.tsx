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
import Message from "@/components/Message";
import connect from "@/container/code";

const initCodeRefValue = `let i = 0;

function test() {
  i++
}

const testFun = (d) => {
  return d + 1
}

const run = function(){
  testFun(3)
}

run()
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
    msgType: string;
    message: string;
    msgVisible: boolean;
  };

  constructor(props: CodeTestProps) {
    super(props);
    this.state = {
      toES5: false,
      msgType: "info",
      message: "",
      msgVisible: false,
      initCodeRefValue:
        props.currCode && props.currCode.type === 3
          ? props.currCode.baseCode
          : initCodeRefValue
    };
    this.codeRef = React.createRef();
  }
  shouldComponentUpdate(nextProps: CodeTestProps) {
    if (nextProps.currCode === this.props.currCode) return true;
    if (nextProps.currCode) {
      this.codeRef.current.resetCode(nextProps.currCode.baseCode as string);
    }
    return true;
  }

  runCurrentApiTest() {
    if (this.props.progress) return;
    this.props.updateProgress(true);
    const userCode = this.codeRef.current.getEditorValue();

    try {
      var transformData = getTransformCode(userCode);
    } catch (e) {
      this.showMessage({ type: "error", message: e.message });
      this.props.updateProgress(false);
      return;
    }

    setTimeout(() => {
      if (transformData.code) {
        let error = null;
        try {
          // eslint-disable-next-line
          const fun = new Function("__start", "__end", transformData.code);
          codeTimer.beginTimer(
            transformData.id,
            this.TimerDataWatcher.bind(this)
          );

          fun(codeTimer.start, codeTimer.end);
        } catch (e) {
          console.log("error");
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
  showMessage({ type, message }: { type: string; message: string }) {
    this.setState({
      msgType: type,
      message,
      msgVisible: true
    });
  }
  closeMessage() {
    this.setState({
      msgVisible: false
    });
  }
  render() {
    return (
      <article className="code-main">
        <section>
          <div className="component-title">Test Cases</div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.runCurrentApiTest()}
          >
            Run Test
            <Replay />
          </Button>
        </section>
        <section style={{ marginTop: "40px" }}>
          <Typography variant="subtitle1" gutterBottom>
            Coding Your Test Cases:
          </Typography>
          <div className="code-editor-box">
            <Editor ref={this.codeRef} value={this.state.initCodeRefValue} />
          </div>
        </section>
        <Message
          visible={this.state.msgVisible}
          type={this.state.msgType}
          closed={() => this.closeMessage()}
          message={this.state.message}
        />
      </article>
    );
  }
}

export default connect(CodeTest);
