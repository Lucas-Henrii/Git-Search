import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.username) {
      newErrors.username = "O nome de usuário é obrigatório.";
    }
    if (!formData.password) {
      newErrors.password = "A senha é obrigatória.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
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
      <form onSubmit={handleSubmit} className="bg-[#212529] flex flex-col items-center justify-center gap-4 p-4 pl-8 pr-8 rounded-2xl">
        <h2 className="text-4xl mb-4 text-white font-bold">Login</h2>
        <Input
          label="Nome de usuário"
          type="text"
          name="username"
          placeholder="Digite seu nome de usuário"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
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
