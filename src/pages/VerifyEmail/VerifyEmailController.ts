import { useState } from "react";
import {
  resendVerificationToken,
  verifyAccount,
} from "../../services/authService";
import { validateRequired } from "../../utils/validation";
import toast from "react-hot-toast";

const VerifyEmailController = () => {
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ otp: string; common: string }>({
    otp: "",
    common: "",
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [resendTimer, setResendTimer] = useState<number>(0);

  const handleResend = async () => {
    const email = localStorage.getItem("user-email") || "";
    if (!email) return toast.error("Email not found, please register again.");

    try {
      setResendTimer(30); // disable for 30 sec
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);

      const response = await resendVerificationToken({ email });

      if (response.success) {
        toast.success("Verification code sent again!");
      } else {
        toast.error(response.message || "Failed to resend code");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ otp: "", common: "" });

    if (!otp) {
      setError({ otp: validateRequired(otp, "OTP"), common: "" });
      return;
    }

    if (otp.length !== 6) {
      setError({ ...error, common: "Please enter a valid 6-digit code" });
      return;
    }

    try {
      const email = localStorage.getItem("user-email") || "";
      if (!email) return;
      setIsLoading(true);
      const response = await verifyAccount({ email, varificationToken: otp });
      if (response.success) {
        setSuccess(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    otp,
    error,
    success,
    setOtp,
    setError,
    handleVerify,
    handleResend,
    resendTimer,
  };
};

export default VerifyEmailController;
