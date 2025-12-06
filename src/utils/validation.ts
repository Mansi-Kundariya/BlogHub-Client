export const validateRequired = (value: string, fieldName: string) => {
  if (!value.trim()) return `${fieldName} is required`;
  return "";
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Email is required";
  if (!emailRegex.test(email)) return "Enter a valid email address";
  return "";
};

export const passwordRules = {
  minLength: 8,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  special: /[^A-Za-z0-9]/,
};

export const validatePassword = (password: string) => {
  return {
    length: password.length >= passwordRules.minLength,
    upper: passwordRules.upper.test(password),
    lower: passwordRules.lower.test(password),
    number: passwordRules.number.test(password),
    special: passwordRules.special.test(password),
  };
};
