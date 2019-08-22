import React, { useState } from "react";
// eslint-disable-next-line
import { match } from "react-router-dom";
import { ApiParams } from "@/router/types";
import Typography from "@material-ui/core/Typography";
import apiStyle from "@/assets/css/api.module.scss";
import Button from "@material-ui/core/Button";
import apiInterpreter from "@/utils/baseStatement";
import Prism from "prismjs";
import Code from "@material-ui/icons/Code";
import Replay from "@material-ui/icons/Replay";
import Chip from "@material-ui/core/Chip";
import { BaseApiInfo } from "@/utils/types";
import { TimerDataInfo } from "@/actions/history";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import common from "@/container/apiMain";

interface viewProps {
  match: match<ApiParams>;
  progress: boolean;
  updateProgress: (status: boolean) => void;
  updateHistoryList: (info: TimerDataInfo) => void;
}

const View: React.FC<viewProps> = ({
  match,
  progress,
  updateProgress,
  updateHistoryList,
}) => {
  const [value, setValue] = useState("50000");
  const { id } = match.params;
  const apiInfo: BaseApiInfo = apiInterpreter.getApiInfo(Number(id));
  const BaseCodeHtml: string = Prism.highlight(
    apiInfo.baseCode,
    Prism.languages.javascript,
    "javascript"
  );
  function handleChange(e: any) {
    setValue(e.target.value);
  }
  const runCurrentApiTest = () => {
    if (progress) return;
    updateProgress(true);
    setTimeout(() => {
      const timerData: TimerDataInfo = apiInfo.fn(Number(value));
      console.log(timerData);
      updateHistoryList(timerData);
      updateProgress(false);
    }, 200);
  };
  return (
    <div className={"api-content-box"}>
      <article className={apiStyle.main}>
        <section>
          <Typography variant="h3" gutterBottom>
            {`#${apiInfo.name}`}
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            className={apiStyle.button}
          >
            Free Code
            <Code />
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={apiStyle.button}
            onClick={runCurrentApiTest}
          >
            Replay
            <Replay />
          </Button>
        </section>
        <section className={apiStyle.times}>
          <Typography variant="subtitle1" gutterBottom>
            Number Of Times:
          </Typography>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={apiStyle.radio}
            value={value}
            onChange={handleChange}
          >
            <Radio value="50000" />
            <span className={apiStyle.radioLabel}>50000</span>
            <Radio value="100000" />
            <span className={apiStyle.radioLabel}>100000</span>
            <Radio value="500000" />
            <span className={apiStyle.radioLabel}>500000</span>
            <Radio value="1000000" />
            <span className={apiStyle.radioLabel}>1000000</span>
            <Radio value="10000000" />
            <span className={apiStyle.radioLabel}>10000000</span>
          </RadioGroup>
        </section>
        <section className={apiStyle.subTitle}>
          <Typography variant="subtitle1" gutterBottom>
            {apiInfo.root
              ? `This api is send for ${apiInfo.root}`
              : "Is base runtime"}
          </Typography>
          <Chip label={apiInfo.expression} />
        </section>
        <section>
          <pre
            className="language-javascript pre-javascript"
            dangerouslySetInnerHTML={{ __html: BaseCodeHtml }}
          />
        </section>
      </article>
    </div>
  );
};

export default common(View);
