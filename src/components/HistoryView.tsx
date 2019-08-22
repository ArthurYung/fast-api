import React from "react";
import connect from "../container/history";
import { TimerDataInfo } from "../actions/history";
import ResultCard from "./ResultCard";
const HistoryView: React.FC<{ historyData: TimerDataInfo[] }> = ({
  historyData
}) => {
  return (
    <aside className="history-box">
      {historyData.map((timerInfo: TimerDataInfo) => (
        <ResultCard key={timerInfo.id} info={timerInfo} />
      ))}
    </aside>
  );
};

export default connect(HistoryView);
