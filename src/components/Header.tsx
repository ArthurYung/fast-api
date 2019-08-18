import React from "react";
// eslint-disable-next-line
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
interface NavBoxProps {
  text: string;
  sub: string;
}

/**
 *  Render different Nav according to current pathname
 */
const createNavLink = (pathname: string): React.ReactElement => {
  if (/^\/api(\/?)/.test(pathname)) {
    return (
      <Link to="/log">
        <NavBox text={"TO Log"} sub={"test1"} />
      </Link>
    );
  }
  if (/^\/log(\/?)/.test(pathname)) {
    return (
      <Link to="/api">
        <NavBox text={"TO API"} sub={"test2"} />
      </Link>
    );
  }
  return <div>no title</div>;
};

// Render a NavBox Dom
const NavBox: React.FC<NavBoxProps> = ({ text, sub }) => (
  <div className="nav-box">
    <h3 className="nav-box-text">{text}</h3>
    <div className="nav-box-subText">{sub}</div>
  </div>
);

class Header extends React.Component<RouteComponentProps> {
  render() {
    const pathname: string = this.props.location.pathname;
    const CurrentNav: React.ReactElement = createNavLink(pathname);
    return (
      <header className="layout-header">
        <nav className="layout-header-nav">{CurrentNav}</nav>
      </header>
    );
  }
}
export default withRouter(Header);
