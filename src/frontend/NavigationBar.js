import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function NavigationBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (

    <div>    
    <Navbar color="light" light expand="md">
       
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          
        <Nav className="mr-auto" navbar>
            <NavItem active={true}> 
              <NavLink href='/fbUser'>{props.firstLink}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/createFbPost">
               {props.secondLink}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/scheduledPosts">
               {props.thirdLink}
              </NavLink>
            </NavItem>
        </Nav>
         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
