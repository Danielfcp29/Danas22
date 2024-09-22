const urlBase = 'http://localhost:3000'; // Altere este URL caso o backend esteja rodando em outro host ou porta

// Funções para Cidades
export const fetchCidades = async () => {
    const response = await fetch(`${urlBase}/cidade`);
    return response.json();
};

export const criarCidade = async (nome, codigoPais) => {
    const response = await fetch(`${urlBase}/cidade`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, codigoPais }),
    });
    return response.json();
};

export const atualizarCidade = async (codigo, nome, codigoPais) => {
    const response = await fetch(`${urlBase}/cidade`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo, nome, codigoPais }),
    });
    return response.json();
};

export const excluirCidade = async (codigo) => {
    const response = await fetch(`${urlBase}/cidade`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo }),
    });
    return response.json();
};
