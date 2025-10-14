import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, serConfirmSenha] = useState("");
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const validarCampos = () => {
    let newErro = {};
    let valido = true;

    if (!email.trim() || !emailRegex.test(email)) {
      newErro.email = "Por favor, insira um formato de e-mail válido.";
      valido = false;
    }

    if (senha.length < 6) {
      newErro.senha = "A senha deve ter no mínimo 6 caracteres.";
      valido = false;
    }

    if (confirmSenha !== senha) {
      newErro.confirmSenha = "A senha de confirmação precisa corresponder.";
      valido = false;
    }

    setErrors(newErro);
    return valido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-2 bg-[#C2255C] text-white">
      <div className="gap-6 flex flex-col">
        <h1 className="text-4xl">Git Search</h1>
        <p className="w-[70%]">
          Encontre e se conecte com profissionais de forma rápida e fácil{" "}
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#212529] flex flex-col items-center justify-center w-[20rem] gap-4 p-4 pl-4 pr-4 rounded-2xl"
      >
        <h2 className="text-4xl mb-4 text-white font-semibold">Register</h2>
        <Input
          label="Email"
          type="text"
          id="user-email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={
            errors.email && (
              <span className="text-red-600 text-[12px]">{errors.email}</span>
            )
          }
        />

        <Input
          label="Senha"
          type="password"
          id="senha-original"
          name="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={
            errors.senha && (
              <span className="text-red-600 text-[12px]">{errors.senha}</span>
            )
          }
        />
        <Input
          label="Confirmar senha"
          type="password"
          id="senha-confirmacao"
          name="confirmPassword"
          placeholder="Confirmar"
          value={confirmSenha}
          onChange={(e) => serConfirmSenha(e.target.value)}
          error={
            errors.confirmSenha && (
              <span className="text-red-600 text-[12px]">
                {errors.confirmSenha}
              </span>
            )
          }
        />
        <button
          type="submit"
          className="bg-[#C2255C] text-white p-2 rounded-[4px] cursor-pointer w-full mt-4"
        >
          Entrar
        </button>
        <div className="mb-2">
          <span>Já tem uma conta? </span>
          <a href={"/"} className="text-[#C2255C]">
            Fazer login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
