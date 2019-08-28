import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
export default (): React.ReactElement => {
  function openGithub() {
    window.open("https://github.com/ArthurYung/fast-api");
  }
  return (
    <footer className="footer-nav">
      <ButtonBase className={"nav-button"} onClick={openGithub}>
        <div className={"nav-box"}>
          <div className="nav-box-content">
            <div className="nav-box-subText">
              github: https://github.com/ArthurYung/fast-api
            </div>
          </div>
        </div>
      </ButtonBase>
    </footer>
  );
};
