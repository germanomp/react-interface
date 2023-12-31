import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import './List.css';

function List() {
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState('');
  const [alunoConsultado, setAlunoConsultado] = useState(null);
  const [alunoAtualizado, setAlunoAtualizado] = useState(null);

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

  const handleUpdate = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:3000/alunos/${alunoConsultado._id.$oid}`, alunoConsultado)
      .then(response => {
        const aluno = response.data;
        setAlunoAtualizado(aluno);
        setAlunoConsultado(null);
        updateAlunoList(aluno);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/alunos/${alunoConsultado._id.$oid}`)
      .then(response => {
        const alunoRemovido = response.data;
        setAlunoConsultado(null);
        updateAlunoList(alunoRemovido);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateAlunoList = (alunoAtualizado) => {
    const updatedAlunos = alunos.filter(aluno => aluno._id !== alunoAtualizado._id);
    setAlunos(updatedAlunos);
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

          <h3>Atualizar Informações:</h3>
          <form className="form-container" onSubmit={handleUpdate}>
            <label>
              Nome:
              <input
                type="text"
                value={alunoConsultado.nome}
                onChange={e => setAlunoConsultado({ ...alunoConsultado, nome: e.target.value })}
              />
            </label>
            <br/>
            <label>
              Idade:
              <input
                type="number"
                value={alunoConsultado.idade}
                onChange={e => setAlunoConsultado({ ...alunoConsultado, idade: e.target.value })}
              />
            </label>
            <br/>
            <label>
              Curso:
              <input
                type="text"
                value={alunoConsultado.curso}
                onChange={e => setAlunoConsultado({ ...alunoConsultado, curso: e.target.value })}
              />
            </label>
            <br/>
            <label>
              Email:
              <input
                type="email"
                value={alunoConsultado.email}
                onChange={e => setAlunoConsultado({ ...alunoConsultado, email: e.target.value })}
              />
            </label>
            <br/>
            <label>
              Endereço:
              <input
                type="text"
                value={alunoConsultado.endereco}
                onChange={e => setAlunoConsultado({ ...alunoConsultado, endereco: e.target.value })}
              />
            </label>
            <br/>
            <button type="submit">Atualizar</button>
            <button onClick={handleDelete}>Remover</button>
          </form>
        </div>
      ) : (
        <Fragment>
          <ul>
            {alunos.map(aluno => (
              <li key={aluno._id.$oid} className="list-item">
                <div className="aluno-info">
                  <span><strong>ID:</strong> {aluno._id.$oid}</span>
                  <span><strong>Nome:</strong> {aluno.nome}</span>
                  <span><strong>Idade:</strong> {aluno.idade}</span>
                  <span><strong>Curso:</strong> {aluno.curso}</span>
                  <span><strong>Email:</strong> {aluno.email}</span>
                  <span><strong>Endereço:</strong> {aluno.endereco}</span>
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      )}

      {alunoAtualizado && (
        <div className="aluno-consultado">
          <h3>Informações do Aluno Atualizado:</h3>
          <div className="aluno-info">
            <span><strong>Nome:</strong> {alunoAtualizado.nome}</span><br/>
            <span><strong>Idade:</strong> {alunoAtualizado.idade}</span><br/>
            <span><strong>Curso:</strong> {alunoAtualizado.curso}</span><br/>
            <span><strong>Email:</strong> {alunoAtualizado.email}</span><br/>
            <span><strong>Endereço:</strong> {alunoAtualizado.endereco}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
