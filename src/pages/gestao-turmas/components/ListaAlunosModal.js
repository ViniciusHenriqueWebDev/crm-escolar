// ListaAlunosModal.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Button, CircularProgress, Box } from '@mui/material'; // Import Box from @mui/material
import api from '../../../Services/api';
import Swal from 'sweetalert2'; // Importa o SweetAlert2

function ListaAlunosModal({ open, onClose, turmaId }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [presenca, setPresenca] = useState({}); // Declare the presenca state here

  useEffect(() => {
    if (open) {
      setLoading(true);
      setPresenca({}); // Reset no estado de presença ao abrir o modal
      api.get(`/Turmas/${turmaId}/alunos`)
        .then(response => {
          setAlunos(response.data);
          let presencaInicial = {};
          response.data.forEach(aluno => {
            presencaInicial[aluno.id] = null;
          });
          setPresenca(presencaInicial);
        })
        .catch(error => {
          console.error("Erro ao buscar alunos:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, turmaId]);

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/Turmas/${turmaId}/alunos`);
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  const marcarPresenca = async (alunoId, status) => {
    try {
      if (status === 'P') {
        await api.post(`/aluno/${alunoId}/marcar-presenca`);
      } else {
        await api.post(`/aluno/${alunoId}/marcar-falta`);
      }
      setPresenca(prev => ({ ...prev, [alunoId]: status }));
      Swal.fire({ // Exibe o alerta de confirmação
        title: status === 'P' ? 'Presença adicionada com sucesso' : 'Falta adicionada com sucesso',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error(`Erro ao marcar ${status === 'P' ? 'presença' : 'falta'}:`, error);
      Swal.fire({ // Exibe o alerta de erro
        title: `Erro ao marcar ${status === 'P' ? 'presença' : 'falta'}`,
        text: 'Por favor, tente novamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  const marcarFalta = async (alunoId) => {
    try {
      await api.post(`/aluno/${alunoId}/marcar-falta`);
      // Talvez atualizar o estado para refletir a mudança
    } catch (error) {
      console.error("Erro ao marcar falta:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Alunos da Turma</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ '& .MuiGrid-item': { display: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
            <Grid container spacing={2} alignItems="center">
              {alunos.map(aluno => (
                <React.Fragment key={aluno.id}>
                  <Grid item xs={4}>{aluno.nome}</Grid>
                  <Grid item xs={4}>{aluno.email}</Grid>
                  <Grid item xs={2}>
                    <Button
                      variant={presenca[aluno.id] === 'P' ? 'contained' : 'outlined'}
                      color="primary"
                      disabled={presenca[aluno.id] === 'F'}
                      onClick={() => marcarPresenca(aluno.id, 'P')}
                    >
                      P
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant={presenca[aluno.id] === 'F' ? 'contained' : 'outlined'}
                      color="secondary"
                      disabled={presenca[aluno.id] === 'P'}
                      onClick={() => marcarPresenca(aluno.id, 'F')}
                    >
                      F
                    </Button>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ListaAlunosModal;
