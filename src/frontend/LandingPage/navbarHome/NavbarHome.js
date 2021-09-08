import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./NavbarHome.css";

function NavbarHome() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const handleClick = () => {
  //     history.push('/login')
  // }

  return (
    <div>
      <Navbar
        className="fixed-top"
        color="light"
        light
        expand="md"
        style={{ paddingLeft: "20px" }}
      >
        <NavbarBrand className="hootsuite-logo"></NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="">Platform</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Plans</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Resources</NavLink>
            </NavItem>
          </Nav>

          <div className="float-end" >
            <button
              className="btn btn-primary loginBtn float-right"
              onClick={() => history.push("/login")}
              style={{ marginRight: "20px" }}
            >
              Login
            </button>
            <button
              className="btn btn-light"
              onClick={() => history.push("/signup")}
            >
              SignUp
            </button>
          </div>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarHome;
