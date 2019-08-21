import React from "react";
// eslint-disable-next-line
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import ButtonBase from "@material-ui/core/ButtonBase";
interface NavBoxProps {
  text: string;
  sub?: string;
  to: string;
  color: string;
}

// Render a NavBox Dom
const NavBox: React.FC<NavBoxProps> = ({
  text,
  sub = "Click Me",
  to,
  color
}) => (
  <Link to={to}>
    <ButtonBase className={"nav-button"}>
      <div className={"nav-box " + color}>
        <div className="nav-box-content">
          <h3 className="nav-box-text">{text}</h3>
          <div className="nav-box-subText">{sub}</div>
        </div>
      </div>
    </ButtonBase>
  </Link>
);

/**
 *  Render different Nav according to current pathname
 */

const HEADER_PROPS_MAP: { [type: number]: NavBoxProps } = {
  0: {
    text: "FAST API",
    to: "/api",
    color: "black"
  },
  1: {
    text: "ES API",
    to: "/log",
    color: "green"
  },
  2: {
    text: "EDIT API",
    to: "/",
    color: "blue"
  },
  3: {
    text: "CODE TEST",
    to: "/",
    color: "red"
  }
};

class Header extends React.Component<RouteComponentProps> {
  render() {
    const pathname: string = this.props.location.pathname;
    let navType: number = 0;
    if (pathname === "/") {
      navType = 0;
    }
    if (/^\/api(\/?)/.test(pathname)) {
      navType = 1;
    }
    if (/^\/log(\/?)/.test(pathname)) {
      navType = 3;
    }
    const navProps: NavBoxProps =
      HEADER_PROPS_MAP[navType] || HEADER_PROPS_MAP[0];
    return (
      <header className="layout-header">
        <nav className="layout-header-nav">
          <NavBox {...navProps} />
        </nav>
      </header>
    );
  }
}
export default withRouter(Header);
