import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  doLogout,
  getCurrentUserName,
  isLoggedIn,
} from "../../api/auth/LoginUtil";

const Header = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(isLoggedIn());
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUsername(getCurrentUserName);
    console.log("Login State", login)
  }, [isLoggedIn()]);

  const handleLogout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/login");
    });
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" style={{ color: "gold" }}>
            <FontAwesomeIcon icon={faVideoSlash} />
            MoviesHD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg 0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/watchList">
                Watch List
              </NavLink>
            </Nav>
            {login && (
              <>
                <Button
                  variant="outline-info"
                  className="me-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button variant="outline-info" className="me-2">
                  {username}
                </Button>
              </>
            )}
            {!login && (
              <>
                <Button variant="outline-info" className="me-2" href="/login">
                  Login
                </Button>
                <Button variant="outline-info" className="me-2" href="/signup">
                  Register
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
