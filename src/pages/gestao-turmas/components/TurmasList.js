import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Col, Row } from 'react-bootstrap';
import api from '../../../Services/api';
import ExpandirTurma from './ExpandirTurmas';
import '../style.css';

const TurmasList = () => {
  const [turmas, setTurmas] = useState([]);
  const [filteredTurmas, setFilteredTurmas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get('/Turmas');
        if (Array.isArray(response.data)) {
          setTurmas(response.data);
          setFilteredTurmas(response.data);
        } else {
          console.error('Dados de turmas não são uma matriz:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchTurmas();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    filterTurmas();
  }, [searchTerm, turmas]);

  const filterTurmas = () => {
    const filtered = turmas.filter(turma => turma.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredTurmas(filtered);
    setSliderValue(0); // Reset slider when filtering
  };

  const updateQtdAlunos = async () => {
    if (!filteredTurmas || filteredTurmas.length === 0) {
      return;
    }

    const updatedTurmas = await Promise.all(
      filteredTurmas.map(async (turma) => {
        const qtdAlunos = await fetchAlunosTurma(turma.id);
        return { ...turma, qtdAlunos };
      })
    );

    setFilteredTurmas(updatedTurmas);
  };

  useEffect(() => {
    updateQtdAlunos();
  }, [filteredTurmas]); // Dependency on 'filteredTurmas'

  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('pt-BR', options);
  };

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  const handleDayFilter = (day) => {
    setSearchTerm(day);
  };

  const fetchAlunosTurma = async (turmaId) => {
    try {
      const response = await api.get(`/Turmas/${turmaId}/alunos`);
      return response.data.length;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return 0;
      } else {
        return 0;
      }
    }
  };

  return (
    <div className="turmas-list-container">
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Filtrar por nome da turma"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            type="range"
            min={0}
            max={filteredTurmas.length - 1}
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </Col>
        <Col xs={2}>
          <Form.Label className="text-muted">
            {filteredTurmas.length > 0 ? filteredTurmas[sliderValue].nome : ''}
          </Form.Label>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => handleDayFilter('Segunda Feira')}>
            Segunda Feira
          </Button>{' '}
          <Button variant="primary" onClick={() => handleDayFilter('Terça Feira')}>
            Terça Feira
          </Button>{' '}
          {/* Adicione mais botões para outros dias da semana, conforme necessário */}
        </Col>
      </Row>
      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            <th>Turma</th>
            <th>Hora Início</th>
            <th>Hora Término</th>
            <th>Qtd Alunos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredTurmas.map((turma, index) => (
            <tr key={turma.id}>
              <td>{turma.nome}</td>
              <td>{formatTime(turma.horaInicio)}</td>
              <td>{formatTime(turma.horaTermino)}</td>
              <td>{turma.qtdAlunos}</td>
              <td>
                <Button variant="success" size="sm" className="action-button">
                  Editar Turma
                </Button>{' '}
                <Button variant="danger" size="sm" className="action-button">
                  Inativar Turma
                </Button>{' '}
                <ExpandirTurma turma={turma} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TurmasList;
