import React, { useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../../services/authService";
import { validateEmail, validateRequired } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

const SignupController = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    common: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    common: "",
  });
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(email),
      password: validateRequired(password, "Password"),
      confirmPassword: validateRequired(confirmPassword, "Confirm Password"),
      firstName: validateRequired(firstName, "First Name"),
      lastName: validateRequired(lastName, "Last Name"),
    };

    setErrors({ ...errors, ...newErrors });

    // If any validation error → stop API call
    if (newErrors.email || newErrors.password) return;

    // Password rule validation
    const isStrong = Object.values(passwordValid).every(Boolean);

    if (!isStrong) {
      setErrors({
        ...errors,
        common: "Password does not meet required rules",
      });
      return;
    } else {
      setErrors({ ...errors, password: "" });
    }

    // Confirm password
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        common: "Passwords do not match",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await signup({ firstName, lastName, email, password });
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("user-email", response.data.user.email);
        navigate("/verify-email");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    setErrors,
    passwordValid,
    setPasswordValid,
    isLoading,
    handleSignup,
  };
};

export default SignupController;
