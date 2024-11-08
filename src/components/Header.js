import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Магазин электроники</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Главная</Nav.Link>
              <Nav.Link as={Link} to="/catalog">Каталог</Nav.Link>
              <Nav.Link as={Link} to="/favorites">Избранное</Nav.Link>
              <Nav.Link as={Link} to="/cart">Корзина</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
}

export default Header;
