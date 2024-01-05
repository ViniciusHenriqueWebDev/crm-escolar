import React from 'react'; 
import ListaEstudantes from './pages/listagemAlunos';
 

const Index = () => {
    return (
        <div className='mt-4'>
            <h1>Alunos Cadastrados</h1>
            <div className='container'>
                <ListaEstudantes />
            </div>
        </div>
    );
};

export default Index;
