// Index.js

import React, { useState } from 'react';
import TabTurmas from './components/TabTurmas';
import CadastrarTurma from './components/CadastroTurmas'; // Ajuste o caminho conforme necessário
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const Index = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className='mt-4'>
      <h1>Turmas Cadastradas</h1>
      <Button variant="contained" onClick={handleOpenDialog} className='mb-2'>
        Criar Turma
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Criar Nova Turma</DialogTitle>
        <DialogContent>
          <CadastrarTurma />
        </DialogContent>
      </Dialog>
      <div className='container'>
        <TabTurmas /> 
      </div>
    </div>
  );
};

export default Index;
