import React, { useState, useEffect } from 'react';
import api from '../../../Services/api';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import ListaAlunosModal from './ListaAlunosModal';


const HorariosTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTurmaId, setSelectedTurmaId] = useState(null);

  const handleOpenModal = (turmaId) => {
    setSelectedTurmaId(turmaId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get('/Turmas');
        const turmasFormatted = response.data.map(turma => ({
          ...turma,
          nome: turma.nome.replace('Terca', 'Terça'),
          horaInicio: turma.horaInicio.substring(0, 5),
          horaTermino: turma.horaTermino.substring(0, 5)
        }));
        setTurmas(turmasFormatted);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchTurmas();
  }, []);

  const turmasOrdenadas = turmas.sort((a, b) => {
    return a.horaInicio.localeCompare(b.horaInicio);
  });

  const horariosPorDia = turmasOrdenadas.reduce((acc, curr) => {
    const dia = curr.nome;
    acc[dia] = acc[dia] || [];
    acc[dia].push(curr);
    return acc;
  }, {});

  const diasDaSemana = Object.keys(horariosPorDia);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabValue} onChange={handleChangeTab} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
        {diasDaSemana.map(dia => <Tab key={dia} label={dia} />)}
      </Tabs>
      {diasDaSemana.map((dia, index) => (
        <TabPanel value={tabValue} index={index} key={dia}>
          <Grid container spacing={2}>
            {horariosPorDia[dia].map(horario => (
              <Grid item xs={12} sm={6} md={4} key={horario.id}>
                <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                  <CardContent>
                    <Typography variant="body1">{`${horario.horaInicio} - ${horario.horaTermino}`}</Typography>
                  </CardContent>
                  <Box>
                    <IconButton aria-label="ver mais" onClick={() => handleOpenModal(horario.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="editar">
                      <EditIcon /> {/* Certifique-se de importar EditIcon de @mui/icons-material */}
                    </IconButton>
                    <IconButton aria-label="inativar">
                      <BlockIcon /> {/* Certifique-se de importar BlockIcon de @mui/icons-material */}
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
      <ListaAlunosModal open={modalOpen} onClose={handleCloseModal} turmaId={selectedTurmaId} />
    </Box>
  );
};


export default HorariosTabs;
