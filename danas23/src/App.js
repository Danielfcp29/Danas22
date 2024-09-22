import React from 'react';
import './App.css';
import Pais from './componentes/pais';  // Certifique-se que o nome do arquivo é "pais.jsx"
import Cidade from './componentes/cidade';  // Certifique-se que o nome do arquivo é "cidade.jsx"

function App() {
  return (
    <div className="App">
      <header className="bg-primary text-white py-3">
        <h1 className="text-center">Gestão de Países e Cidades</h1>
      </header>
      <main className="container mt-5">
        <div className="row">
          <section className="col-md-6">
            <h2 className="text-primary">Países</h2>
            <Pais />
          </section>
          <section className="col-md-6">
            <h2 className="text-primary">Cidades</h2>
            <Cidade />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
