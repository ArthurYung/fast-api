import React, { useState, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Message from "./Message";
import { addData } from "@/utils/indexDB";
import { TimerDataInfo } from "@/actions/history";
import { dateFormat } from "@/utils/date";
import interpreter from "@/utils/baseStatement";
interface ChildTimerInfo {
  name: string;
  useTime: number;
}

interface FcProps {
  info: TimerDataInfo;
  saveTimer: () => void;
  deleteTimer: (timerInfo: TimerDataInfo) => void;
}

interface MessageInfo {
  type: string;
  message: string;
  visible: boolean;
}

const MyCard: React.FC<FcProps> = ({ info, deleteTimer }) => {
  const [visible, setVisible] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    type: "success",
    visible: false,
    message: "",
  });
  const showMenu = Boolean(anchorEl);
  const resultClassName = info.status === 2 ? "result-error" : "result-success";

  const timerChildList: ChildTimerInfo[] = [];

  function deepChild(child: TimerDataInfo[], root: string = "") {
    child.forEach((info: TimerDataInfo) => {
      timerChildList.push({
        name: root + info.name,
        useTime: info.useTime,
      });
      if (info.children.length) {
        deepChild(info.children, info.name);
      }
    });
  }

  function openSettingMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function deleteCurrInfo() {
    setVisible(0);
    handleClose();
    setTimeout(() => deleteTimer(info), 300);
  }

  function saveCurrentInfo() {
    handleClose();
    const databaseItem = {
      timerInfo: info,
      codeInfo: interpreter.getDatabaseInfo(info.uid),
      type: 1,
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

  deepChild(info.children);
  return (
    <aside className="result-card">
      <Grow in={Boolean(visible)}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={resultClassName}>
                {info.status === 1 ? <Check /> : <Clear />}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings" onClick={openSettingMenu}>
                <MoreVertIcon />
              </IconButton>
            }
            title={info.name}
            subheader={dateFormat(info.date, "mm-dd HH:MM:SS")}
            className="result-card-header"
          />
          <CardContent>
            {timerChildList.map((childInfo: ChildTimerInfo, i: number) => (
              <div className="result-card-item" key={i}>
                <span className="card-item-root">{childInfo.name}</span>
                <span className="card-item-time">{childInfo.useTime}ms</span>
              </div>
            ))}
          </CardContent>
          <Divider />
          <CardContent>
            {info.status === 1 ? (
              <div className="result-active-success">use: {info.useTime}ms</div>
            ) : (
              <div className="result-active-error">{info.error}</div>
            )}
          </CardContent>
        </Card>
      </Grow>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={showMenu}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 120,
          },
        }}
      >
        <MenuItem onClick={saveCurrentInfo}>SaveDB</MenuItem>
        <MenuItem onClick={deleteCurrInfo}>Delete</MenuItem>
      </Menu>
      <Message
        visible={messageInfo.visible}
        type={messageInfo.type}
        closed={closeMessage}
        message={messageInfo.message}
      />
    </aside>
  );
};

export default MyCard;
