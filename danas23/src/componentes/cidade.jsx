import React, { useState, useEffect } from 'react';
import { fetchCidades, criarCidade, atualizarCidade, excluirCidade } from '../services/cidadeService';
import { fetchPaises } from '../services/paisService';

function Cidade() {
  const [cidades, setCidades] = useState([]);
  const [paises, setPaises] = useState([]);
  const [nome, setNome] = useState('');
  const [codigoPais, setCodigoPais] = useState('');  
  const [codigoEdit, setCodigoEdit] = useState(null);

  
  useEffect(() => {
    carregarCidades();
    carregarPaises();
  }, []);

  const carregarCidades = async () => {
    const data = await fetchCidades();
    setCidades(data.listaCidades);
  };

  const carregarPaises = async () => {
    const data = await fetchPaises();
    setPaises(data.listaPaises);
  };

  const handleCriar = async () => {
    if (nome && codigoPais) {
      await criarCidade(nome, codigoPais);
      setNome('');
      setCodigoPais('');
      carregarCidades(); 
    } else {
      alert('Por favor, preencha o nome da cidade e o código do país');
    }
  };

  const handleAtualizar = async () => {
    if (codigoEdit && nome && codigoPais) {
      await atualizarCidade(codigoEdit, nome, codigoPais);
      setCodigoEdit(null);
      setNome('');
      setCodigoPais('');
      carregarCidades();  
    } else {
      alert('Por favor, preencha todos os campos antes de atualizar');
    }
  };

  const handleExcluir = async (codigo) => {
    if (window.confirm('Tem certeza que deseja excluir esta cidade?')) {
      await excluirCidade(codigo);
      carregarCidades();  
    }
  };

  const handleEditar = (cidade) => {
    setCodigoEdit(cidade.codigo);
    setNome(cidade.nome);
    setCodigoPais(cidade.codigoPais); 
  };

  
  const obterNomePais = (codigoPais) => {
    if (!codigoPais || paises.length === 0) {
      return 'Desconhecido'; 
    }

    const pais = paises.find((p) => parseInt(p.codigo) === parseInt(codigoPais));
    return pais ? pais.nome : 'Desconhecido';  
  };

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nome da Cidade</th>
            <th>País</th> 
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cidades.map((cidade) => (
            <tr key={cidade.codigo}>
              <td>{cidade.codigo}</td>
              <td>{cidade.nome}</td>
              <td>{obterNomePais(cidade.codigoPais)}</td>  
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(cidade)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(cidade.codigo)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          placeholder="Nome da Cidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="text" 
          className="form-control"
          placeholder="Código do País"
          value={codigoPais}  
          onChange={(e) => setCodigoPais(e.target.value)}
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
              setCodigoPais('');
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default Cidade;
