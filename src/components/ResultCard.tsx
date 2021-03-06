import React, { useState } from "react";
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

import { TimerDataInfo, TimerChild } from "@/actions/history";
import { dateFormat } from "@/utils/date";

interface FcProps {
  info: TimerDataInfo;
  collectTimer: (info: TimerDataInfo) => void;
  deleteTimer: (timerInfo: TimerDataInfo) => void;
}

const MyCard: React.FC<FcProps> = ({ info, deleteTimer, collectTimer }) => {
  const [visible, setVisible] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const showMenu = Boolean(anchorEl);
  const resultClassName = info.status === 2 ? "result-error" : "result-success";

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
    collectTimer(info);
  }
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
            {info.children.map((childInfo: TimerChild, i: number) => (
              <div className="result-card-item" key={i}>
                <span
                  className={
                    childInfo.async ? "card-item-root async" : "card-item-root"
                  }
                >
                  {childInfo.name}
                </span>
                <span className="card-item-time">{childInfo.time}ms</span>
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
            width: 120
          }
        }}
      >
        <MenuItem onClick={saveCurrentInfo}>Collect</MenuItem>
        <MenuItem onClick={deleteCurrInfo}>Delete</MenuItem>
      </Menu>
    </aside>
  );
};

export default MyCard;
