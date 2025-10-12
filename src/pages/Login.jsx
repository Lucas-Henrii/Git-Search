import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
 const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();


  const validarCampos = () => {
    let newErro = {};
    let valido = true;

    if (!email.trim() || !emailRegex.test(email)) {
      newErro.email = 'Por favor, insira um formato de e-mail válido.';
      valido = false;
    }

    if (email && !senha.trim() || senha.length < 6) {
      newErro.senha = 'Email ou senha inválidos.';
      valido = false;
    }

    setErrors(newErro);
    return valido;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1500);
    }
  };


  return (
    <div className="h-screen w-screen flex items-center justify-center gap-2 bg-[#C2255C] text-white">
      <div className="gap-6 flex flex-col">
        <h1 className="text-4xl">Git Search</h1>
        <p className="w-[70%]">Encontre e se conecte com profissionais de forma rápida e fácil </p>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#212529] flex flex-col items-center justify-center w-[20rem] gap-4 p-4 pl-4 pr-4 rounded-2xl">
        <h2 className="text-4xl mb-4 text-white font-semibold">Login</h2>
        <Input
          label="Nome de usuário"
          type="text"
          id="user-email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          id="user-password"
          name="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={errors.senha && (<span className="text-red-600 text-[12px]">{errors.senha}</span>)}
        />
        <button type="submit" className="bg-[#C2255C] text-white p-2 rounded-[4px] cursor-pointer w-full mt-4">Entrar</button>
        <a href="">Esqueceu sua senha?</a>
      <div className="mb-2">
        <span>Não tem uma conta? </span><a href={"/Register"} className="text-[#C2255C]">Registrar-se</a></div>
      </form>
    </div>
  );
};

export default Login;
