import apiService from "./apiService";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await apiService<{
    accessToken: string;
    user: any;
  }>({
    method: "POST",
    url: "/auth/login",
    data: { email, password },
  });

  return response;
};

export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await apiService<{
    success: boolean;
    message: string;
    data: { accessToken: string; user: any };
  }>({
    method: "POST",
    url: "/auth/signup",
    data: { firstName, lastName, email, password },
  });

  return response;
};

export const verifyAccount = async ({
  email,
  varificationToken,
}: {
  email: string;
  varificationToken: string;
}) => {
  const response = await apiService<{ success: boolean; message: string }>({
    method: "POST",
    url: "/auth/verify-account",
    data: { email, varificationToken },
  });
  return response;
};

export const resendVerificationToken = async ({ email }: { email: string }) => {
  const response = await apiService<{ success: boolean; message: string }>({
    method: "POST",
    url: "/auth/resend-verification-token",
    data: { email },
  });
  return response;
};

export const forgotPassword = async ({ email }: { email: string }) => {
  const response = await apiService<{ message: string }>({
    method: "POST",
    url: "/auth/forgot-password",
    data: { email },
  });

  return response;
};

export const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const response = await apiService<{ success: boolean }>({
    method: "POST",
    url: `/auth/reset-password/${token}`,
    data: { token, password },
  });

  return response;
};
