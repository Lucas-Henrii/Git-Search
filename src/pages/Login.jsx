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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Entrar</button>
      </form>
      <a href={"/Register"}>Registrar-se</a>
    </div>
  );
};

export default Login;
