// CepService.js
import axios from 'axios';

const buscarEnderecoPorCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      // Tratamento para quando o CEP não é encontrado
      alert('CEP não encontrado.');
      return null;
    }
    return response.data;
  } catch (error) {
    // Tratamento para quando ocorre um erro na chamada da API
    if (error.response) {
      // A resposta da API com o erro veio aqui
      alert(`Erro: ${error.response.data.message}`);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      alert('Erro ao buscar o endereço. Sem resposta da API.');
    } else {
      // Algo mais causou um erro na requisição
      alert('Erro ao fazer a requisição.');
    }
    return null;
  }
};

export default buscarEnderecoPorCep;
