import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logoSistema from '../../assets/logo-crmescolar.png';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkToken(); // Chame a função de verificação síncrona imediatamente
  }, []); // Run only once on mount

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoSistema}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="CRM Escolar"
          />{' '}
          CRM Escolar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className="text-light">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/alunos" className="text-light">Alunos</Nav.Link>
                <Nav.Link as={Link} to="/turmas" className="text-light">Turmas</Nav.Link>
                <Nav.Link as={Link} to="/settings" className="text-light">Configurações</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout} className="ms-2"><FaUser /> Logout</Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-light"><FaUser /> Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
