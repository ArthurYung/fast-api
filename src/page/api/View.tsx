import React from "react";
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
import connect from "@/container/apiMain";

interface viewProps {
  match: match<ApiParams>;
  progress: boolean;
  updateProgress: (state: boolean) => void;
}

const View: React.FC<viewProps> = ({ match, progress, updateProgress }) => {
  const { id } = match.params;
  const apiInfo: BaseApiInfo = apiInterpreter.getApiInfo(Number(id));
  const BaseCodeHtml: string = Prism.highlight(
    apiInfo.baseCode,
    Prism.languages.javascript,
    "javascript"
  );
  const runCurrentApiTest = () => {
    updateProgress(true);
    apiInfo.fn(10000);
    apiInfo.fn(50000);
    apiInfo.fn(100000);
  };
  return (
    <div className={"api-view-box"}>
      <article className={apiStyle.main}>
        <section>
          <Typography variant="h3" gutterBottom>
            {`#${apiInfo.name}`}
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            className={apiStyle.button}
            onClick={() => updateProgress(false)}
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

export default connect(View);
