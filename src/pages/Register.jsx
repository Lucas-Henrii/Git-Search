import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <form>
        <h2>Register</h2>
        <Input
          label="Nome de usuário"
          type="text"
          name="username"
          placeholder="Digite seu nome de usuário"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
      </form>
    </div>
  );
}

export default Register;
