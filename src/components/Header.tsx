import React from "react";
// eslint-disable-next-line
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
interface NavBoxProps {
  text: string;
  sub: string;
  to: string;
  color: string
}

// Render a NavBox Dom
const NavBox: React.FC<NavBoxProps> = ({ text, sub, to, color }) => (
  <Link to={to}>
    <div className="nav-box" style={{color}}>
      <h3 className="nav-box-text">{text}</h3>
      <div className="nav-box-subText">{sub}</div>
    </div>
  </Link>
);

/**
 *  Render different Nav according to current pathname
 */

const HEADER_PROPS_MAP: {[type: number]: NavBoxProps} = {
  0: {
    text: 'None',
    sub: 'None',
    to: '/None',
    color: 'black'
  },
  1: {
    text: 'To LOG',
    sub: 'is one',
    to: '/log',
    color: 'red'
  },
  2: {
    text: "To API",
    sub: "is two",
    to: "/api",
    color: 'blue'
  }
}

class Header extends React.Component<RouteComponentProps> {
  render() {
    const pathname: string = this.props.location.pathname;
    let navType: number = 0
    if (/^\/api(\/?)/.test(pathname)) {
      navType = 1
    }
    if (/^\/log(\/?)/.test(pathname)) {
      navType = 2
    }
    const navProps:NavBoxProps = HEADER_PROPS_MAP[navType] || HEADER_PROPS_MAP[0]
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
