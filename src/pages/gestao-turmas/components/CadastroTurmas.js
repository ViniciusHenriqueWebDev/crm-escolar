// NovaTurma.js

import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import api from '../../../Services/api';

const CadastrarTurma = () => {
  const [turma, setTurma] = useState({
    nome: '',
    horaInicio: '',
    horaTermino: ''
  });

  const handleChange = (event) => {
    setTurma({ ...turma, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Adiciona ":00" para converter o formato de hora para HH:mm:ss
    const horaInicioComSegundos = turma.horaInicio + ":00";
    const horaTerminoComSegundos = turma.horaTermino + ":00";
  
    // Cria um novo objeto com o formato de hora atualizado
    const novaTurma = {
      ...turma,
      horaInicio: horaInicioComSegundos,
      horaTermino: horaTerminoComSegundos
    };
  
    try {
      const response = await api.post('/Turmas', novaTurma);
      console.log('Turma criada:', response.data);
      // Resetar o formulário ou tomar alguma ação após a criação
      setTurma({ nome: '', horaInicio: '', horaTermino: '' });
    } catch (error) {
      console.error('Erro ao criar turma:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nome"
        label="Nome da Turma"
        name="nome"
        autoFocus
        value={turma.nome}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="horaInicio"
        label="Hora de Início"
        name="horaInicio"
        type="time"
        value={turma.horaInicio}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="horaTermino"
        label="Hora de Término"
        name="horaTermino"
        type="time"
        value={turma.horaTermino}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Criar Turma
      </Button>
    </Box>
  );
};

export default CadastrarTurma;
