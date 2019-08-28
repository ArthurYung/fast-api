import React from "react";
import HistoryView from "@/components/HistoryView";
import Content from "./Content";

const Code: React.FC = () => {
  return (
    <div className="code-box">
      <Content />
      <HistoryView />
    </div>
  );
};

export default Code;
