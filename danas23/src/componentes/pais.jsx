import React, { useState, useEffect } from 'react';
import { fetchPaises, criarPais, atualizarPais, excluirPais } from '../services/paisService';

function Pais() {
  const [paises, setPaises] = useState([]);
  const [nome, setNome] = useState('');
  const [codigoEdit, setCodigoEdit] = useState(null);

  // Carregar os países ao montar o componente
  useEffect(() => {
    carregarPaises();
  }, []);

  const carregarPaises = async () => {
    const data = await fetchPaises();
    setPaises(data.listaPaises);  // Certifique-se de que a resposta do backend contém listaPaises
  };

  const handleCriar = async () => {
    if (nome) {
      await criarPais(nome);
      setNome('');
      carregarPaises();  // Atualiza a lista de países
    } else {
      alert('Por favor, preencha o nome do país');
    }
  };

  const handleAtualizar = async () => {
    if (codigoEdit && nome) {
      await atualizarPais(codigoEdit, nome);
      setCodigoEdit(null);
      setNome('');
      carregarPaises();  // Atualiza a lista de países
    } else {
      alert('Por favor, preencha o nome do país');
    }
  };

  const handleExcluir = async (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir este país?')) {
      await excluirPais(codigo);
      carregarPaises();  // Atualiza a lista de países
    }
  };

  const handleEditar = (pais) => {
    setCodigoEdit(pais.codigo);
    setNome(pais.nome);  // Preenche o campo de nome do país para edição
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
          {paises.map((pais) => (
            <tr key={pais.codigo}>
              <td>{pais.codigo}</td>
              <td>{pais.nome}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(pais)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(pais.codigo)}>Excluir</button>
              </td>
            </tr>
          ))}
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
