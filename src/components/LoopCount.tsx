import React from "react";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

interface LoopCountProps {
  value: string;
  change: (value: string) => void;
}

const LoopCount: React.FC<LoopCountProps> = ({ value, change }) => {
  return (
    <React.Fragment>
      <Typography variant="subtitle1" gutterBottom>
        Loop Count($n):
      </Typography>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        className={"radio"}
        value={value}
        onChange={(e: any, value: string) => change(value)}
      >
        <Radio value="10000" color="primary" />
        <span className={"radioLabel"}>10&thous.</span>
        <Radio value="50000" color="primary" />
        <span className={"radioLabel"}>50&thous.</span>
        <Radio value="100000" color="primary" />
        <span className={"radioLabel"}>100&thous.</span>
        <Radio value="500000" color="primary" />
        <span className={"radioLabel"}>500&thous.</span>
        <Radio value="1000000" color="primary" />
        <span className={"radioLabel"}>1&milli.</span>
        <Radio value="10000000" color="primary" />
        <span className={"radioLabel"}>10&milli.</span>
      </RadioGroup>
    </React.Fragment>
  );
};

export default LoopCount;
