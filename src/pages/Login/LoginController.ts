import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateRequired } from "../../utils/validation";

const LoginController = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    common: string;
  }>({
    email: "",
    password: "",
    common: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErros = {
      email: validateEmail(email),
      password: validateRequired(password, "Password"),
    };

    setErrors({ ...errors, ...newErros });

    if (newErros.email || newErros.password) return;

    try {
      setIsLoading(true);
      const response = await login({ email, password });
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (error: any) {
      console.error("Login Error:", error.message);
      setErrors({ ...errors, common: error.message || "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    email,
    password,
    errors,
    setEmail,
    setPassword,
    setErrors,
    handleLogin,
  };
};

export default LoginController;
