import React from "react";
import connect from "../container/history";
import { TimerDataInfo } from "../actions/history";
import ResultCard from "./ResultCard";

interface FcProps {
  historyData: TimerDataInfo[];
  deleteTimer: (timerInfo: TimerDataInfo) => void;
}

const HistoryView: React.FC<FcProps> = ({ historyData, deleteTimer }) => {
  function saveTimer() {}
  return (
    <aside className="history-box">
      {historyData.map((timerInfo: TimerDataInfo) => (
        <ResultCard
          key={timerInfo.id}
          info={timerInfo}
          deleteTimer={deleteTimer}
          saveTimer={saveTimer}
        />
      ))}
    </aside>
  );
};

export default connect(HistoryView);
