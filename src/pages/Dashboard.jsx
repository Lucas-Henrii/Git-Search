import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const DashBoard = () => {
  const [termoBusca, setTermoBusca] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToSearch = termoBusca.trim();

    if (userToSearch) {
      navigate(`/profile/${userToSearch}`);
    } else {
      alert("Por favor, digite um nome de usuário do GitHub.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#C2255C] text-white">
      <div className="bg-[#C2255C] w-[50%] h-full flex justify-center items-center">
        <div className="gap-6 flex flex-col">
          <h1 className="text-4xl">Git Search</h1>
          <p className="w-[70%]">
            Encontre e se conecte com profissionais de forma rápida e fácil{" "}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#212529] flex flex-col items-center justify-center w-[50%] h-full"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl mb-8 text-white font-semibold">
            Procurar por um usuário
          </h2>
          <Input
            label="Usuário github"
            type="text"
            id="user-search-input"
            placeholder="Digite um usuário do github aqui..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#C2255C] text-white p-2 rounded-[4px] cursor-pointer w-full mt-4"
          >
            Ver perfil do github
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashBoard;
