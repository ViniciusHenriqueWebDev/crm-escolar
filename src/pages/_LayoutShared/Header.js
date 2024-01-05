import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logoSistema from '../../assets/logo-crmescolar.png';
import { FaUser } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logoSistema}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo CRM Escolar"
          />{' '}
          CRM Escolar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/alunos">Alunos</Nav.Link>
                <Nav.Link href="/turmas">Turmas</Nav.Link>
                <Nav.Link href="/settings">Configurações</Nav.Link>
                <Nav.Link onClick={handleLogout}><FaUser /> Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/"><FaUser /> Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
