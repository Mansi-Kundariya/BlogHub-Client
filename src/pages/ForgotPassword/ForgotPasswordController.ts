import { useState } from "react";
import { forgotPassword } from "../../services/authService";
import toast from "react-hot-toast";

const ForgotPasswordController = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await forgotPassword({ email });
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };
  return {
    isLoading,
    email,
    submitted,
    setEmail,
    setSubmitted,
    handleSubmit,
  };
};

export default ForgotPasswordController;
