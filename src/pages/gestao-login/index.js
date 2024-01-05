import React, { useState } from 'react';
import logoImage from '../../assets/logo-crmescolar.png';
import Swal from 'sweetalert2'; 
import './style.css';
import api from '../../Services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    const data = { email, password };

    try {
      const response = await api.post('/LoginUser', data);
      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);
      
      Swal.fire({
        title: 'Login bem-sucedido!',
        text: 'Você será redirecionado para a página de alunos.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/alunos');
        }
      });
      
    } catch (error) {
      Swal.fire({
        title: 'Erro no login!',
        text: 'Verifique suas credenciais e tente novamente.',
        icon: 'error',
        confirmButtonText: 'Fechar'
      });
    }
  }

  return (
    <div className="login-container">
      <section className='form'>
        <img src={logoImage} alt='Logo CRM Escolar' />
        <form onSubmit={login}>
          <h1>CRM Escolar - {new Date().getFullYear()}</h1>

          <input type='text' placeholder='E-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input type='password' placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <p>V1.001 - Alpha Tester</p>

          <button className='btn btn-primary mt-2' type='submit'>Fazer Login</button>
        </form>
      </section>
    </div>
  );
}
