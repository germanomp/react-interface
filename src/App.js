/* eslint-disable no-undef */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function List() {
  const [alunos, setAlunos] = useState([]); 

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

  return (
    <div className="list-container">
      <h2 className="list-title">Lista de Alunos</h2>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno._id} className="list-item">
            <span>Nome: {aluno.nome}</span>
            <span>Idade: {aluno.idade}</span>
            <span>Curso: {aluno.curso}</span>
            <span>Email: {aluno.email}</span>
            <span>Endereço: {aluno.endereco}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default List;
