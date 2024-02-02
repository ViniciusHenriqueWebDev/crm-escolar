// ExpandirTurma.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import api from '../../../Services/api';

const ExpandirTurma = ({ turma }) => {
    const [show, setShow] = useState(false);
    const [alunos, setAlunos] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        await fetchAlunosTurma();
    };

    const formatTime = (timeString) => {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false };
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('pt-BR', options);
    };

    const fetchAlunosTurma = async () => {
        try {
            const response = await api.get(`/Turmas/${turma.id}/alunos`);
            setAlunos(response.data);
        } catch (error) {
            return 0;
        }
    };

    const markPresence = (alunoId) => {
        console.log(`Marcando presença para o aluno ${alunoId}`);
        // Lógica para marcar presença
    };

    const markAbsence = (alunoId) => {
        console.log(`Marcando falta para o aluno ${alunoId}`);
        // Lógica para marcar falta
    };

    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    return (
        <>
            <Button variant="secondary" size="sm" onClick={handleShow}>
                Expandir
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{`Turma: ${turma.nome} - ${formatTime(turma.horaInicio)} e ${formatTime(turma.horaTermino)}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Aluno</th>
                                <th>Telefone</th>
                                <th>Frequência</th>
                                <th>Ultima Presença</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno) => (
                                <tr key={aluno.id}>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.telefone}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            style={{ marginRight: '8px' }}
                                            onClick={() => markPresence(aluno.id)}
                                            disabled={aluno.presenca} // Disable if already marked
                                        >
                                            P
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => markAbsence(aluno.id)}
                                            disabled={aluno.falta} // Disable if already marked
                                        >
                                            F
                                        </Button>
                                    </td>
                                    <td>{dataFormatada}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Button variant="info" size="sm">
                                                Detalhes
                                            </Button>
                                            <Button variant="danger" size="sm" className="ms-1">
                                                Remover
                                            </Button>
                                            <Button variant="danger" size="sm" className="ms-1">
                                                Entrar em contato
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExpandirTurma;
