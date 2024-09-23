const urlBase = 'http://localhost:3000'; 


export const fetchPaises = async () => {
    const response = await fetch(`${urlBase}/pais`);
    if (!response.ok) {
        throw new Error('Erro ao buscar países');
    }
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
    if (!response.ok) {
        throw new Error('Erro ao criar país');
    }
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
    if (!response.ok) {
        throw new Error('Erro ao atualizar país');
    }
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
    if (!response.ok) {
        throw new Error('Erro ao excluir país');
    }
    return response.json();
};
