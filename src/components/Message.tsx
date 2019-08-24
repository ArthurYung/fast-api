import React, { SyntheticEvent } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Warning from "@material-ui/icons/Warning";
import Error from "@material-ui/icons/Error";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Info from "@material-ui/icons/Info";

interface MessageProps {
  visible: boolean;
  message: string;
  type?: string;
  closed: () => void;
}

const SnackBarIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === "success") {
    return <CheckCircle />;
  }
  if (type === "warn") {
    return <Warning />;
  }
  if (type === "error") {
    return <Error />;
  }
  return <Info />;
};

const Message: React.FC<MessageProps> = ({
  message,
  visible,
  closed,
  type = "info",
}) => {
  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    closed();
  };
  return (
    <span>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        open={visible}
        onClose={handleClose}
        className={"message-box-" + type}
      >
        <SnackbarContent
          className="message-content"
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className="message-content-txt">
              <SnackBarIcon type={type} />
              {message}
            </span>
          }
        />
      </Snackbar>
    </span>
  );
};

export default Message;
