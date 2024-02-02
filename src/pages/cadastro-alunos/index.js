import React, { useState } from 'react';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../Services/api';
import './style.css';
import buscarEnderecoPorCep from '../../Services/CepService'; // Importe a função do novo arquivo

export default function NovoAluno({ alunoId = '0', handleClose }) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        cep: '',
        endereco: '',
        bairro: '',
        numeroCasa: '',
        statusAluno: 'Ativo',
    });
    const [loadingCep, setLoadingCep] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    // No seu componente React
    const handleCepBlur = async () => {
        const cep = formData.cep.replace(/[^0-9]/g, '');
        if (cep.length === 8) {
            setLoadingCep(true);
            const endereco = await buscarEnderecoPorCep(cep);
            setLoadingCep(false);
            if (endereco) {
                setFormData({
                    ...formData,
                    endereco: endereco.logradouro,
                    bairro: endereco.bairro,
                });
            }
        } else {
            alert('CEP deve conter 8 dígitos.');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isRegistering = alunoId === '0';
            const url = isRegistering ? '/registrar' : `/alunos/atualizar/${alunoId}`;
            const payload = isRegistering ? { cep: formData.cep } : formData;

            const response = await api.post(url, payload);

            if (isRegistering) {
                setFormData({
                    ...formData,
                    endereco: response.data.endereco,
                    bairro: response.data.bairro,
                });
            }

            alert(`Aluno ${isRegistering ? 'cadastrado' : 'atualizado'} com sucesso!`);
            handleClose();
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error);
            alert('Erro ao submeter o formulário.');
        }
    };


    return (
        <div className="container my-3 p-3 bg-light border rounded">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col xs={4}>
                        <Form.Group controlId="nome">
                            <Form.Label className="text-left">Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="email">
                            <Form.Label className="text-start">Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="telefone">
                            <Form.Label className="text-start">Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Telefone"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataNascimento">
                            <Form.Label className="text-start">Data Nascimento</Form.Label>
                            <DatePicker
                                selected={formData.dataNascimento}
                                onChange={(date) => handleDateChange('dataNascimento', date)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={2}>
                        <Form.Group controlId="cep">
                            <Form.Label className="text-start">CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="CEP"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                onBlur={handleCepBlur}
                                required
                            />
                            {loadingCep && <Spinner animation="border" size="sm" />}
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group as={Col} controlId="endereco">
                            <Form.Label className="text-start">Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Endereço"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="bairro">
                            <Form.Label className="text-start">Bairro</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Bairro"
                                name="bairro"
                                value={formData.bairro}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                        <Form.Group as={Col} controlId="numeroCasa">
                            <Form.Label className="text-start">Número da Casa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Número da Casa"
                                name="numeroCasa"
                                value={formData.numeroCasa}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={2} controlId="statusAluno">
                        <Form.Label className="text-start">Status do Aluno</Form.Label>
                        <Form.Control
                            as="select"
                            name="statusAluno"
                            value={formData.statusAluno}
                            onChange={handleChange}
                            required
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Inadimplente">Inadimplente</option>
                        </Form.Control>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    {alunoId === '0' ? 'Cadastrar Aluno' : 'Atualizar Aluno'}
                </Button>
            </Form>
        </div >
    );
}
