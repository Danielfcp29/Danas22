import React, { useState, useEffect } from 'react';
import { fetchPaises, criarPais, atualizarPais, excluirPais } from '../services/paisService';

function Pais() {
  const [paises, setPaises] = useState([]);
  const [nome, setNome] = useState('');
  const [codigoEdit, setCodigoEdit] = useState(null);

  useEffect(() => {
    carregarPaises();
  }, []);

  const carregarPaises = async () => {
    try {
      const data = await fetchPaises();
      setPaises(data.listaPaises);
    } catch (error) {
      console.error('Erro ao carregar países:', error);
    }
  };

  const handleCriar = async () => {
    if (nome) {
      await criarPais(nome);
      setNome('');
      carregarPaises();  
    }
  };

  const handleAtualizar = async () => {
    if (codigoEdit && nome) {
      await atualizarPais(codigoEdit, nome);
      setCodigoEdit(null);
      setNome('');
      carregarPaises();  
    }
  };

  const handleExcluir = async (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este país?')) {
      await excluirPais(codigo);
      carregarPaises();  
    }
  };

  const handleEditar = (pais) => {
    setCodigoEdit(pais.codigo);
    setNome(pais.nome);
  };

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nome do País</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paises.length > 0 ? (
            paises.map((pais) => (
              <tr key={pais.codigo}>
                <td>{pais.codigo}</td>
                <td>{pais.nome}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(pais)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(pais.codigo)}>Excluir</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">Nenhum país encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          placeholder="Nome do País"
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <button 
          className="btn btn-primary" 
          onClick={codigoEdit ? handleAtualizar : handleCriar}
        >
          {codigoEdit ? 'Atualizar' : 'Criar'}
        </button>
        {codigoEdit && (
          <button 
            className="btn btn-secondary ms-2"
            onClick={() => {
              setCodigoEdit(null);
              setNome('');
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default Pais;
