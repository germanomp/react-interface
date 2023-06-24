/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function List() {
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState('');
  const [alunoConsultado, setAlunoConsultado] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/alunos')
      .then(response => {
        const alunos = response.data;
        setAlunos(alunos);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:3000/alunos/${alunoId}`)
      .then(response => {
        const aluno = response.data;
        setAlunoConsultado(aluno);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="list-container">
      <h2 className="list-title">Lista de Alunos</h2>

      <div className="search-container">
        <input
          type="text"
          value={alunoId}
          onChange={e => setAlunoId(e.target.value)}
          placeholder="Digite o ID do aluno"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="aluno-info-container">
        {alunoConsultado ? (
          <div className="aluno-consultado">
            <h3>Informações do Aluno Consultado:</h3>
            <div className="aluno-info">
              <span><strong>Nome:</strong> {alunoConsultado.nome}</span><br/>
              <span><strong>Idade:</strong> {alunoConsultado.idade}</span><br/>
              <span><strong>Curso:</strong> {alunoConsultado.curso}</span><br/>
              <span><strong>Email:</strong> {alunoConsultado.email}</span><br/>
              <span><strong>Endereço:</strong> {alunoConsultado.endereco}</span>
            </div>
          </div>
        ) : (
          <ul>
            {alunos.map(aluno => (
              <li key={aluno._id} className="list-item">
                <div className="aluno-info">
                  <span><strong>Nome:</strong> {aluno.nome}</span>
                  <span><strong>Idade:</strong> {aluno.idade}</span>
                  <span><strong>Curso:</strong> {aluno.curso}</span>
                  <span><strong>Email:</strong> {aluno.email}</span>
                  <span><strong>Endereço:</strong> {aluno.endereco}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default List;
