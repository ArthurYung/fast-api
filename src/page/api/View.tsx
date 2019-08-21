import React from "react";
// eslint-disable-next-line
import { match } from "react-router-dom";
import { ApiParams } from "@/router/types";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import apiStyle from "@/assets/css/api.module.scss";
import apiInterpreter from "@/utils/baseStatement";

interface BaseApiInfo {
  name: string;
  fn: Function;
  baseCode: string;
  initCode: string;
  loop: boolean;
  root: string | undefined;
  id: number;
  key: string;
}

const View = ({ match }: { match: match<ApiParams> }) => {
  const { id } = match.params;
  const apiInfo: BaseApiInfo = apiInterpreter.getApiInfo(Number(id));
  console.log(apiInfo);
  return (
    <div className={"api-view-box"}>
      <article className={apiStyle.main}>
        <Typography variant="h3" gutterBottom>
          is Api
        </Typography>
      </article>
    </div>
  );
};

export default View;
