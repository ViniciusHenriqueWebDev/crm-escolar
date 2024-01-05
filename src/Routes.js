import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/gestao-login';
import NovoAluno from './pages/cadastro-alunos';
import Index from './pages/gestao-alunos';
import Turmas from './pages/gestao-turmas/index';
import SchoolDashboard from './pages/main-dashboard/index';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/alunos' element={isAuthenticated() ? <Index /> : <Navigate to="/" />} />
      <Route path='/Turmas' element={isAuthenticated() ? <Turmas /> : <Navigate to="/" />} />
      <Route path='/novo-aluno/:alunoId' element={isAuthenticated() ? <NovoAluno /> : <Navigate to="/" />} />
      <Route path='/dashboard' element={isAuthenticated() ? <SchoolDashboard /> : <Navigate to="/" />} />
      <Route path='/settings' element={isAuthenticated() ? <NovoAluno /> : <Navigate to="/" />} />
    </Routes>
  );
}
