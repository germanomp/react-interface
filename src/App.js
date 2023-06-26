import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Cadastro from './Cadastro';
import List from './List';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Lista de Alunos</Link>
            </li>
            <li>
              <Link to="/cadastro">Cadastrar Aluno</Link>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/" element={<List />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
