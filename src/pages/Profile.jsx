import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"; // 👈 PRECISA DE useParams

const Profile = () => {
  // 1. Captura o nome de usuário da URL
  const { username } = useParams();

  // 2. Estados para o resultado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função de busca (adaptada para buscar UM perfil único)
  const fetchUser = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://api.github.com/users/${query}`;

    try {
      const response = await fetch(apiUrl);

      if (response.status === 404) {
        throw new Error(`Usuário "${query}" não encontrado no GitHub.`);
      }

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}.`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. Dispara a busca quando o componente é montado
  useEffect(() => {
    if (username) {
      fetchUser(username);
    } else {
      setError("Nenhum nome de usuário fornecido na URL.");
    }
  }, [username, fetchUser]);

  // 4. Renderização
  if (loading) {
    return (
      <div className="text-center mt-20 text-blue-600 text-xl">
        Carregando perfil de **{username}**...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl">
        Erro: {error}
      </div>
    );
  }

  // 5. Exibição do Perfil
  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Perfil de {user?.login}
      </h1>

      {user && (
        <div className="bg-white p-6 rounded-xl shadow-2xl flex items-center gap-6">
          <img
            src={user.avatar_url}
            alt={`Avatar de ${user.login}`}
            className="w-32 h-32 rounded-full border-4 border-[#C2255C]"
          />
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              {user.name || user.login}
            </h2>
            <p className="text-xl text-gray-600 mb-3">@{user.login}</p>
            <p className="text-gray-700">
              {user.bio || "Sem biografia disponível."}
            </p>
            {/* ... (outros dados do perfil) */}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C2255C] hover:underline mt-4 inline-block font-medium"
            >
              Ver no GitHub
            </a>
          </div>
        </div>
      )}

      {/* Botão opcional para voltar */}
      <a
        onClick={() => window.history.back()}
        className="mt-8 block text-center text-blue-500 cursor-pointer hover:underline"
      >
        ← Fazer nova busca
      </a>
    </div>
  );
};

export default Profile;
