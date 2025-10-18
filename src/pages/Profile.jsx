import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"; // 👈 PRECISA DE useParams

const Profile = () => {
  // 1. Captura o nome de usuário da URL
  const { username } = useParams();

  // 2. Estados para o resultado
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepos = useCallback(async (query) => {
    const repoApiUrl = `https://api.github.com/users/${query}/repos?sort=updated&per_page=10`;

    try {
      const response = await fetch(repoApiUrl);
      if (!response.ok) {
        // Não lança erro fatal se os repos não vierem, apenas exibe o erro
        console.error("Erro ao buscar repositórios:", response.statusText);
        setRepos([]);
        return;
      }
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      console.error("Falha na requisição de repositórios:", err);
      setRepos([]);
    }
  }, []);

  // Função de busca (adaptada para buscar UM perfil único)
  const fetchUser = useCallback(
    async (query) => {
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

        await fetchRepos(query);
      } catch (error) {
        setError(error.message);
        setUser(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchRepos]
  );

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
      <div className="text-center mt-20 text-[#C2255C] text-xl">
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
    <div className="bg-[#212529]">
      <div className="p-8 max-w-3xl mx-auto bg-[#212529] min-h-screen">
        {user && (
          <div className="bg-[#212529] p-6 rounded-xl flex items-center gap-6 relative">
            <a
              onClick={() => window.history.back()}
              className="mt-8 block text-center text-white bg-[#33363A] p-2 rounded cursor-pointer absolute right-0 top-0"
            >
              ← Fazer nova busca
            </a>
            <img
              src={user.avatar_url}
              alt={`Avatar de ${user.login}`}
              className="w-20 h-20 rounded-full border-4 border-[#C2255C]"
            />
            <div>
              <h2 className="text-3xl font-extrabold text-white">
                {user.name || user.login}
              </h2>
              <p className="text-xl text-gray-300 mb-3">@{user.login}</p>
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

        {repos.length > 0 ? (
          <div className="space-y-3 flex flex-wrap gap-8 overflow-auto scrollbar-custom h-[23rem]">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="p-4 border justify-around flex flex-col border-gray-500 hover:border-white rounded-lg hover:bg-[#191C1F] transition duration-150 w-80 h-60 "
              >
                <h1 className="text-2xl font-semibold text-white">
                  {repo.name}
                </h1>
                <p className="text-sm text-gray-700 mt- truncate-single-line">
                  {repo.description || "Sem descrição."}
                </p>
                <div className="flex gap-1 text-xs text-gray-500 mt-2 justify-between">
                  <span>🌟 {repo.stargazers_count}</span>
                  <span>
                    Atualizado em:{" "}
                    {new Date(repo.pushed_at).toLocaleDateString()}
                  </span>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-white bg-[#D6336C] p-1 w-[8rem] text-center rounded-[4px]"
                >
                  Repositório
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Este usuário não possui repositórios públicos ou atingimos o limite
            de requisições.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
