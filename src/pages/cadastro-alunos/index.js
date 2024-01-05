import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import api from '../../Services/api';
import './style.css';

export default function NovoAluno({ alunoId = '0', show, handleClose }) {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        username: '',
        email: '',
        endereco: '',
        endereco2: '',
        pais: '',
        estado: '',
        cep: '',
    });
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await api.get('/Turmas');
                setTurmas(response.data);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };
        fetchTurmas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const action = alunoId === '0' ? api.post : api.put;
            const url = alunoId === '0' ? '/alunos/registrar' : `/alunos/atualizar/${alunoId}`;
            await action(url, formData);
            alert(`Aluno ${alunoId === '0' ? 'cadastrado' : 'atualizado'} com sucesso!`);
            handleClose();
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error);
            alert('Erro ao submeter o formulário.');
        }
    };

    return (
        <div className="container my-3 p-3">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Col} xs={12} md={6} controlId="nome">
                        <Form.Label className='label-left-align'>Primeiro Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Primeiro Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} controlId="sobrenome">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Sobrenome"
                            name="sobrenome"
                            value={formData.sobrenome}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                {/* Adicione mais campos conforme necessário... */}

                <div className="d-grid gap-2 mt-3">
                    <Button variant="primary" type="submit">
                        {alunoId === '0' ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
