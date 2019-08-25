import React, { Fragment, useState } from "react";
import connect from "../container/history";
import { TimerDataInfo } from "../actions/history";
import { DatabaseItem } from "@/utils/types";
import ResultCard from "./ResultCard";
import Fab from "@material-ui/core/Fab";
import Drawer from "@material-ui/core/Drawer";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import CollectorList from "./CollectorList";
import Message from "./Message";
import interpreter from "@/utils/baseStatement";
import { addData, deleteData } from "@/utils/indexDB";
import { withRouter, RouteComponentProps } from "react-router-dom";
interface FcProps extends RouteComponentProps {
  historyData: TimerDataInfo[];
  deleteTimer: (timerInfo: TimerDataInfo) => void;
}

interface MessageInfo {
  type: string;
  message: string;
  visible: boolean;
}

const HistoryView: React.FC<FcProps> = ({
  historyData,
  deleteTimer,
  history,
}) => {
  const [drawer, setDrawer] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    type: "success",
    visible: false,
    message: "",
  });
  function handleCloseDrawer() {
    setDrawer(false);
  }
  function handleOpenDrawer() {
    setDrawer(true);
  }
  function showMessage({ type, message }: { type: string; message: string }) {
    setMessageInfo({
      type,
      message,
      visible: true,
    });
  }
  function closeMessage() {
    setMessageInfo({
      ...messageInfo,
      visible: false,
    });
  }
  function collectTimer(info: TimerDataInfo) {
    const codeInfo = interpreter.getDatabaseInfo(info.uid);
    const databaseItem = {
      timerInfo: info,
      codeInfo: codeInfo,
      type: codeInfo.type,
    };
    addData(databaseItem)
      .then(() => {
        showMessage({
          type: "success",
          message: "Saved timer record",
        });
      })
      .catch((err: any) => {
        showMessage({
          type: "warn",
          message: String(err),
        });
      });
  }

  function replayCollect(item: DatabaseItem) {
    let historyObject = {
      pathname: "",
      state: item.codeInfo,
    };
    if (item.type === 1) {
      historyObject.pathname = "/custom/?type=1";
    }
    if (item.type === 2) {
      historyObject.pathname = "/custom/?type=2";
    }
    history.push(historyObject);
  }

  async function deleteCollect(item: DatabaseItem) {
    if (!item.id) return 0;
    const { error } = await deleteData(item.id);
    if (error) {
      showMessage({
        type: "error",
        message: error,
      });
      return 0;
    }
    return 1;
  }

  return (
    <Fragment>
      <aside className="history-box">
        <div className="collector-button">
          <Fab variant="extended" aria-label="open" onClick={handleOpenDrawer}>
            <KeyboardArrowLeft />
            Open Collector
          </Fab>
        </div>
        {historyData.map((timerInfo: TimerDataInfo) => (
          <ResultCard
            key={timerInfo.id}
            info={timerInfo}
            deleteTimer={deleteTimer}
            collectTimer={collectTimer}
          />
        ))}
      </aside>
      <Drawer anchor="right" open={drawer} onClose={handleCloseDrawer}>
        <CollectorList
          replayCollect={replayCollect}
          deleteCollect={deleteCollect}
        />
      </Drawer>
      <Message
        visible={messageInfo.visible}
        type={messageInfo.type}
        closed={closeMessage}
        message={messageInfo.message}
      />
    </Fragment>
  );
};

export default connect(withRouter(HistoryView));
