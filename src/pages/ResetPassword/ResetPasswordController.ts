import toast from "react-hot-toast";
import { resetPassword } from "../../services/authService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { validateRequired } from "../../utils/validation";

const ResetPasswordController = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [passwordValid, setPasswordValid] = useState<{
    length: boolean;
    upper: boolean;
    lower: boolean;
    number: boolean;
    special: boolean;
  }>({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [errors, setErrors] = useState<{
    password: string;
    confirmPassword: string;
    common: string;
  }>({
    password: "",
    confirmPassword: "",
    common: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ password: "", confirmPassword: "", common: "" });

    // Check required fields
    const newErros = {
      password: validateRequired(password, "Password"),
      confirmPassword: validateRequired(confirmPassword, "Confirm Password"),
    };

    if (newErros.password || newErros.confirmPassword) {
      setErrors({ ...errors, ...newErros });
      return;
    }

    // Check password rules
    const isStrong = Object.values(passwordValid).every(Boolean);
    if (!isStrong) {
      setErrors({
        ...errors,
        common: "Password does not meet the required rules.",
      });
      return;
    }

    // Check match
    if (password !== confirmPassword) {
      setErrors({ ...errors, common: "Passwords do not match." });
      return;
    }

    try {
      if (!token) return;
      const response = await resetPassword({ token, password });
      if (response.success) setSuccess(true);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    passwordValid,
    errors,
    success,
    handleReset,
    setErrors,
    setPassword,
    setPasswordValid,
    setConfirmPassword,
    isLoading,
  };
};

export default ResetPasswordController;
