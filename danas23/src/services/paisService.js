const urlBase = 'http://localhost:3000'; // Altere este URL caso o backend esteja rodando em outro host ou porta

// Funções para Países
export const fetchPaises = async () => {
    const response = await fetch(`${urlBase}/pais`);
    return response.json();
};

export const criarPais = async (nome) => {
    const response = await fetch(`${urlBase}/pais`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
    });
    return response.json();
};

export const atualizarPais = async (codigo, nome) => {
    const response = await fetch(`${urlBase}/pais`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo, nome }),
    });
    return response.json();
};

export const excluirPais = async (codigo) => {
    const response = await fetch(`${urlBase}/pais`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo }),
    });
    return response.json();
};
