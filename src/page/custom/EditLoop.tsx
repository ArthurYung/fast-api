import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Replay from "@material-ui/icons/Replay";
import classes from "@/assets/css/custom.module.scss";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import interpreter from "@/utils/baseStatement";
import { TimerDataInfo } from "@/actions/history";
import { DatabaseCodeInfo } from "@/utils/types";
import connect from "@/container/apiMain";
import Message from "@/components/Message";
import Editor from "@/components/Editor";

interface expressionProps {
  progress: boolean;
  updateProgress: (status: boolean) => void;
  updateHistoryList: (info: TimerDataInfo) => void;
  currCode?: DatabaseCodeInfo;
}

interface MessageInfo {
  type: string;
  message: string;
  visible: boolean;
}

class EditLoop extends React.Component<expressionProps> {
  state: {
    loopCount: string;
    messageInfo: MessageInfo;
    initCodeRefValue1: string;
    initCodeRefValue2: string;
  };
  codeRef1: any;
  codeRef2: any;
  constructor(props: expressionProps) {
    super(props);
    this.state = {
      loopCount: "50000",
      messageInfo: {
        type: "success",
        visible: false,
        message: ""
      },
      initCodeRefValue1:
        props.currCode && props.currCode.type === 2
          ? (props.currCode.initCode as string)
          : "",
      initCodeRefValue2: props.currCode ? props.currCode.baseCode : ""
    };
    this.codeRef1 = React.createRef();
    this.codeRef2 = React.createRef();
  }
  runCurrentApiTest() {
    const initCode: string = this.codeRef1.current.getEditorValue();
    const baseCode: string = this.codeRef2.current.getEditorValue();

    if (this.props.progress) return;
    if (!initCode && !baseCode) return;

    this.props.updateProgress(true);

    setTimeout(() => {
      const apiInfo = interpreter.createCustomInfo(baseCode, initCode);
      const timerData: TimerDataInfo = apiInfo.fn(this.state.loopCount);
      if (!timerData.id) {
        this.showMessage({ type: "error", message: timerData.error as string });
      } else {
        interpreter.pushCustomApiInfo(apiInfo);
        this.props.updateHistoryList(timerData);
      }
      this.props.updateProgress(false);
    }, 200);
  }
  shouldComponentUpdate(nextProps: expressionProps) {
    if (nextProps === this.props) return true;
    if (nextProps.currCode) {
      this.codeRef1.current.resetCode(nextProps.currCode.initCode as string);
      this.codeRef2.current.resetCode(nextProps.currCode.baseCode);
    }
    return true;
  }
  handleChangeTime(value: string) {
    this.setState({
      loopCount: value
    });
  }

  showMessage({ type, message }: { type: string; message: string }) {
    this.setState({
      messageInfo: {
        visible: true,
        type,
        message
      }
    });
  }

  closeMessage() {
    this.setState({
      messageInfo: {
        visible: false
      }
    });
  }
  render() {
    console.log(this.props.currCode);
    return (
      <article>
        <section>
          {this.props.currCode && this.props.currCode.initCode}
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
        <section className={classes.items}>
          <Typography variant="subtitle1" gutterBottom>
            Loop Count($n):
          </Typography>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.radio}
            value={this.state.loopCount}
            onChange={(e: any, value: string) => this.handleChangeTime(value)}
          >
            <Radio value="50000" color="primary" />
            <span className={classes.radioLabel}>50000</span>
            <Radio value="100000" color="primary" />
            <span className={classes.radioLabel}>100000</span>
            <Radio value="500000" color="primary" />
            <span className={classes.radioLabel}>500000</span>
            <Radio value="1000000" color="primary" />
            <span className={classes.radioLabel}>1000000</span>
            <Radio value="10000000" color="primary" />
            <span className={classes.radioLabel}>10000000</span>
          </RadioGroup>
        </section>
        <section className={classes.items}>
          <Typography variant="subtitle1" gutterBottom>
            Before the timer begin code:
          </Typography>
          <div className={classes.editBox}>
            <Editor ref={this.codeRef1} value={this.state.initCodeRefValue1} />
          </div>
        </section>
        <section className={classes.items}>
          <Typography variant="subtitle1" gutterBottom>
            Code under test:
          </Typography>
          <div className={classes.editBox}>
            <Editor ref={this.codeRef2} value={this.state.initCodeRefValue2} />
          </div>
        </section>
        <Message
          visible={this.state.messageInfo.visible}
          type={this.state.messageInfo.type}
          closed={() => this.closeMessage()}
          message={this.state.messageInfo.message}
        />
      </article>
    );
  }
}
export default connect(EditLoop);
