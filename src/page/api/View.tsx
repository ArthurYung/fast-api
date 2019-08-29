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
import common from "@/container/apiMain";
import LoopCount from "@/components/LoopCount";

interface viewProps {
  match: match<ApiParams>;
  progress: boolean;
  updateProgress: (status: boolean) => void;
  updateHistoryList: (info: TimerDataInfo) => void;
  history: any;
}

const View: React.FC<viewProps> = ({
  match,
  progress,
  updateProgress,
  updateHistoryList,
  history
}) => {
  const [value, setValue] = useState("50000");
  const { id } = match.params;
  const apiInfo: BaseApiInfo = apiInterpreter.getApiInfo(id);
  const BaseCodeHtml: string = Prism.highlight(
    apiInfo.baseCode,
    Prism.languages.javascript,
    "javascript"
  );

  const handleChange = (value: string) => {
    setValue(value);
  };

  const runCurrentApiTest = () => {
    if (progress) return;
    updateProgress(true);
    setTimeout(() => {
      const timerData: TimerDataInfo = apiInfo.fn(Number(value));
      updateHistoryList(timerData);
      updateProgress(false);
    }, 200);
  };

  const runEditApiTest = () => {
    history.push({
      pathname: "/custom/?type=2",
      state: apiInfo
    });
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
            onClick={runEditApiTest}
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
            Run Test
            <Replay />
          </Button>
        </section>
        <section className={apiStyle.times}>
          <LoopCount value={value} change={handleChange} />
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
