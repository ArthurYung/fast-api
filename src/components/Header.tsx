import React from "react";
// eslint-disable-next-line
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
interface NavBoxProps {
  text: string;
  sub: string;
}

const NavBox: React.FC<NavBoxProps> = ({ text, sub }) => (
  <div className="nav-box">
    <h3 className="nav-box-text">{text}</h3>
    <div className="nav-box-subText">{sub}</div>
  </div>
);

class Header extends React.Component<RouteComponentProps> {
  render() {
    const pathname = this.props.location.pathname;
    const CurrentNav = (() => {
      if (/^\/api(\/?)/.test(pathname)) {
        return (
          <Link to="/api">
            <NavBox text={"TO Log"} sub={"test1"} />
          </Link>
        );
      }
    })();
    return (
      <header className="layout-header">
        <nav className="layout-header-nav">
          <Link to="/api">
            <NavBox text={"TO Log"} sub={"test1"} />
          </Link>
          <Link to="/log">
            <NavBox text={"TO API"} sub={"test12"} />
          </Link>
        </nav>
      </header>
    );
  }
}
export default withRouter(Header);
