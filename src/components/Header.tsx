import React from "react";
// eslint-disable-next-line
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
interface NavBoxProps {
  text: string;
  sub: string;
  to: string;
}

// Render a NavBox Dom
const NavBox: React.FC<NavBoxProps> = ({ text, sub, to }) => (
  <Link to={to}>
    <div className="nav-box">
      <h3 className="nav-box-text">{text}</h3>
      <div className="nav-box-subText">{sub}</div>
    </div>
  </Link>
);

/**
 *  Render different Nav according to current pathname
 */

class Header extends React.Component<RouteComponentProps> {
  render() {
    const pathname: string = this.props.location.pathname;
    const navProps: NavBoxProps = (() => {
      if (/^\/api(\/?)/.test(pathname)) {
        return {
          text: "To LOG",
          sub: "is one",
          to: "/log",
        };
      }
      if (/^\/log(\/?)/.test(pathname)) {
        return {
          text: "To API",
          sub: "is two",
          to: "/api",
        };
      }
      return { text: "To API", sub: "is two", to: "/api" };
    })();

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
