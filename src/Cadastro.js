import axios from 'axios';
import React, { useState } from 'react';
import './Cadastro.css';

function Cadastro() {
  const [novoAluno, setNovoAluno] = useState({
    nome: '',
    idade: '',
    curso: '',
    email: '',
    endereco: ''
  });
  const [cadastrado, setCadastrado] = useState(false); // Nova variável de estado

  const handleCadastro = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3000/alunos', novoAluno)
      .then(response => {
        const alunoCadastrado = response.data;
        setNovoAluno({
          nome: '',
          idade: '',
          curso: '',
          email: '',
          endereco: ''
        });
        setCadastrado(true); // Define a variável 'cadastrado' como true
        // eslint-disable-next-line no-undef
        updateAlunoList(alunoCadastrado);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (cadastrado) {
    return <div>Aluno cadastrado com sucesso!</div>; // Renderiza uma mensagem após o cadastro ser concluído
  }

  return (
    <div className="form-container"> {/* Adicione a classe 'form-container' para aplicar o estilo */}
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={handleCadastro}>
        <label>
          Nome:
          <input
            type="text"
            value={novoAluno.nome}
            onChange={e => setNovoAluno({ ...novoAluno, nome: e.target.value })}
          />
        </label>
        <br/>
        <label>
          Idade:
          <input
            type="number"
            value={novoAluno.idade}
            onChange={e => setNovoAluno({ ...novoAluno, idade: e.target.value })}
          />
        </label>
        <br/>
        <label>
          Curso:
          <input
            type="text"
            value={novoAluno.curso}
            onChange={e => setNovoAluno({ ...novoAluno, curso: e.target.value })}
          />
        </label>
        <br/>
        <label>
          Email:
          <input
            type="email"
            value={novoAluno.email}
            onChange={e => setNovoAluno({ ...novoAluno, email: e.target.value })}
          />
        </label>
        <br/>
        <label>
          Endereço:
          <input
            type="text"
            value={novoAluno.endereco}
            onChange={e => setNovoAluno({ ...novoAluno, endereco: e.target.value })}
          />
        </label>
        <br/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
