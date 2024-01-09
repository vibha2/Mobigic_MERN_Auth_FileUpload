import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./navbar.css";
import React, { useEffect, useState } from "react";
import AuthService from "../../../services/authService";
function NavbarComponent(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);
   
  const handleIconHover = () => {
    setMenuOpen(true);
  };

  const handleIconLeave = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setMenuOpen(false);
    localStorage.setItem("logged-in-user", null);
    console.log("Logout clicked");
  };
  useEffect(() => {
    console.log("props =>", props.props);
    if (props.props !== "null") {
      AuthService.getUserById(props.props).then(
        (res) => {
          console.log("user =>", res.data.user);
          setUser(res.data.user);
        },
        (err) => {
          console.log("err =>", err);
        }
      );
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false)
    }
  }, [props]);

  return (
    <div className="navbar-container">
      <Navbar collapseOnSelect expand="md">
        <Container>
          <a href="/" className="logo-name">
            CRYPTOS
          </a>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            {isLoggedIn && user ? (
              <div
                className="icon-container initials-container"
                onMouseEnter={handleIconHover}
                onMouseLeave={handleIconLeave}
              >
                {user?.firstName[0] + " " + user?.lastName[0]}

                {/* Conditional rendering for the menu */}
                {isMenuOpen && (
                  <div className="logout-menu">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Nav>
                <Nav.Link as={Link} to="/login" className="text-light">
                  Login
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  as={Link}
                  to="/sign-up"
                  className="text-light"
                >
                  Sign up
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
