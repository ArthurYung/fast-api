import React, { useState, ChangeEvent, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Replay from "@material-ui/icons/Replay";
import classes from "@/assets/css/custom.module.scss";
import TextField from "@material-ui/core/TextField";
import Prism from "prismjs";
import interpreter from "@/utils/baseStatement";
import { BaseApiInfo, DatabaseCodeInfo } from "@/utils/types";
import { TimerDataInfo } from "@/actions/history";
import connect from "@/container/apiMain";
import Message from "@/components/Message";
import LoopCount from "@/components/LoopCount";
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
const Expression: React.FC<expressionProps> = ({
  progress,
  updateProgress,
  updateHistoryList,
  currCode
}) => {
  const [loopCount, setLoopCount] = useState<string>("50000");
  const [rootName, setRootName] = useState<string>("");
  const [apiName, setApiName] = useState<string>("");
  const [expression, setExpression] = useState<string>("");
  const [apiInfo, setApiInfo] = useState<BaseApiInfo | undefined>();
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    type: "success",
    visible: false,
    message: ""
  });
  const BaseCodeHtml: string = Prism.highlight(
    apiInfo ? apiInfo.baseCode : "",
    Prism.languages.javascript,
    "javascript"
  );
  const initCodeHtml: string = Prism.highlight(
    apiInfo ? apiInfo.initCode : "",
    Prism.languages.javascript,
    "javascript"
  );

  let throttleTimeout: any;

  useEffect(() => {
    if (currCode && currCode.type === 1) {
      const parseCurrInfo = interpreter.getBaseApiInfo(
        currCode.expression,
        currCode.key as string,
        currCode.root
      );
      if (parseCurrInfo) {
        setExpression(parseCurrInfo.expression || "");
        setRootName(parseCurrInfo.root || "");
        setApiName(parseCurrInfo.key || "");
        setApiInfo(parseCurrInfo);
      }
    }
  }, [currCode]);

  function runCurrentApiTest() {
    if (progress) return;
    if (apiInfo) {
      updateProgress(true);
      setTimeout(() => {
        const timerData: TimerDataInfo = apiInfo.fn(Number(loopCount));
        if (!timerData.id) {
          showMessage({ type: "error", message: timerData.error as string });
        } else {
          interpreter.pushCustomApiInfo(apiInfo);
          updateHistoryList(timerData);
        }
        updateProgress(false);
      }, 200);
    }
  }

  function handleChangeTime(value: string) {
    setLoopCount(value);
  }
  function inputRootName(e: ChangeEvent<HTMLInputElement>) {
    setRootName(e.currentTarget.value);
  }
  function inputApiName(e: ChangeEvent<HTMLInputElement>) {
    setApiName(e.currentTarget.value);
  }
  function inputExpression(e: ChangeEvent<HTMLInputElement>) {
    setExpression(e.currentTarget.value);
    translateApiInfo(e.currentTarget.value);
  }
  function translateApiInfo(expression: string) {
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
      const apiInfo = interpreter.getBaseApiInfo(expression, apiName, rootName);
      if (apiInfo) {
        setApiInfo(apiInfo);
      }
    }, 500);
  }
  function showMessage({ type, message }: { type: string; message: string }) {
    setMessageInfo({
      type,
      message,
      visible: true
    });
  }
  function closeMessage() {
    setMessageInfo({
      ...messageInfo,
      visible: false
    });
  }

  return (
    <article>
      <section>
        <div className="component-title">Use Expression</div>
        <Button variant="contained" color="primary" onClick={runCurrentApiTest}>
          Run Test
          <Replay />
        </Button>
      </section>
      <section className={classes.items}>
        <LoopCount value={loopCount} change={handleChangeTime} />
      </section>
      <section className={classes.items}>
        <Typography variant="subtitle1" gutterBottom>
          Expression:
        </Typography>
        <div className={classes.formInput}>
          <TextField
            label="Root Name"
            className={classes.apiInput}
            onChange={inputRootName}
            value={rootName}
            helperText="set expression api root path"
          />
          <TextField
            label="API Name"
            className={classes.apiInput}
            onChange={inputApiName}
            value={apiName}
            helperText="set expression api name"
          />
          <TextField
            label="Expression"
            className={classes.expressionInput}
            onChange={inputExpression}
            value={expression}
            helperText={<span>see expression <a rel="noopener noreferrer" target="_blank" href="https://github.com/ArthurYung/fast-api/blob/master/README.md#expression%E6%A8%A1%E5%BC%8F">rules</a></span>}
          />
        </div>
      </section>
      <section className={classes.items}>
        <Typography variant="subtitle1" gutterBottom>
          Before the timer begin code:
        </Typography>
        <pre
          className="language-javascript pre-javascript"
          style={{ minHeight: "40px" }}
          dangerouslySetInnerHTML={{ __html: initCodeHtml }}
        />
      </section>
      <section className={classes.items}>
        <Typography variant="subtitle1" gutterBottom>
          Code under test:
        </Typography>
        <pre
          className="language-javascript pre-javascript"
          style={{ minHeight: "40px" }}
          dangerouslySetInnerHTML={{ __html: BaseCodeHtml }}
        />
      </section>
      <Message
        visible={messageInfo.visible}
        type={messageInfo.type}
        closed={closeMessage}
        message={messageInfo.message}
      />
    </article>
  );
};

export default connect(Expression);
