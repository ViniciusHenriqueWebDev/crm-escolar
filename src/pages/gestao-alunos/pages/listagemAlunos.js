// ListaEstudantes.js

import React, { useState, useEffect } from 'react';
import api from '../../../Services/api';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Box 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ListaEstudantes = () => {
  const [estudantes, setEstudantes] = useState([]);
  const [erro, setErro] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    api.get('/listar-alunos')
      .then(response => {
        setEstudantes(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar a lista de estudantes!", error);
        setErro('Falha ao carregar a lista de estudantes.');
      });
  }, []);

  if (erro) {
    return <p className="error">{erro}</p>;
  }

  if (estudantes.length === 0) {
    return <p>Nenhum estudante encontrado.</p>;
  }

  return (
    <TableContainer component={Paper} className='mt-2'>
      <Table>
        <TableHead>
          <TableRow>
            {!isMobile && <TableCell>ID</TableCell>}
            <TableCell>Nome</TableCell>
            {isMobile && <TableCell>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {estudantes.map((estudante) => (
            <TableRow key={estudante.id}>
              {!isMobile && <TableCell>{estudante.id}</TableCell>}
              <TableCell>{estudante.nome}</TableCell>
              {isMobile && (
                <TableCell>
                  <Box display="flex" justifyContent="space-around">
                    <Button variant="contained" color="primary" size="small">P</Button>
                    <Button variant="contained" color="secondary" size="small">F</Button>
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaEstudantes;
