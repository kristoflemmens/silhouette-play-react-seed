import _ from 'lodash';
import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import config from 'config/index';

import Logo from './assets/logo.png';
import './Header.scss';

const Header = ({ current, user, route, onSignOut, children }) => (
  <Navbar fluid fixedTop inverse id="header">
    <Navbar.Header>
      <Navbar.Brand>
        <a><img src={Logo} width="30px" height="30px" alt="Silhouette Play React Seed Template" /></a>
      </Navbar.Brand>
    </Navbar.Header>
    {children || ''}
    {_.isEmpty(user) ? (
      <Nav className="not-authenticated" pullRight>
        <NavItem
          className="sign-in"
          onSelect={() => route(config.route.auth.signIn)}
          active={current === config.route.auth.signIn}
        >
          SignIn
        </NavItem>
        <NavItem
          className="sign-up"
          onSelect={() => route(config.route.auth.signUp)}
          active={current === config.route.auth.signUp}
        >
          SignUp
        </NavItem>
      </Nav>
    ) : (
      <div>
        <Navbar.Text className="authenticated" pullRight>
          Signed in as: <span>{user.name}</span>
        </Navbar.Text>
        <Nav className="authenticated" pullRight>
          <NavItem className="sign-out" onSelect={onSignOut} title="Sign out">
            <FaSignOut width="25px" height="25px" />
          </NavItem>
        </Nav>
      </div>
    )}
  </Navbar>
);

Header.propTypes = {
  current: React.PropTypes.string.isRequired,
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
  }).isRequired,
  route: React.PropTypes.func.isRequired,
  onSignOut: React.PropTypes.func.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export default Header;