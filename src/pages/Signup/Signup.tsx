import React from "react";
import { Link } from "react-router-dom";
import { validatePassword } from "../../utils/validation";
import SignupController from "./SignupController";

const RuleItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
  <p
    className={`${
      isValid ? "text-green-600" : "text-red-600"
    } flex items-center gap-2`}
  >
    <span>{isValid ? "✔" : "✘"}</span> {text}
  </p>
);

const Signup = () => {
  const {
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
  } = SignupController();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-lg border border-border shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 text-purple-600">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign up to get started with your account
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* First / Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setErrors({ ...errors, common: "", firstName: "" });
                    setFirstName(e.target.value.trim());
                  }}
                  className={`w-full px-4 py-2 border rounded-md text-sm ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setErrors({ ...errors, common: "", lastName: "" });
                    setLastName(e.target.value.trim());
                  }}
                  className={`w-full px-4 py-2 border border-border rounded-md text-sm ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setErrors({ ...errors, common: "", email: "" });
                  setEmail(e.target.value);
                }}
                className={`w-full px-4 py-2 border rounded-md text-sm ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-purple-500"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password / Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setErrors({ ...errors, common: "", password: "" });
                    setPasswordValid(validatePassword(value));
                  }}
                  className={`w-full px-4 py-2 border rounded-md text-sm ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setErrors({ ...errors, common: "", confirmPassword: "" });
                    setConfirmPassword(e.target.value);
                  }}
                  className={`w-full px-4 py-2 border rounded-md text-sm ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Password Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg border">
              <div className="space-y-1">
                <RuleItem
                  isValid={passwordValid.length}
                  text="Minimum 8 characters"
                />
                <RuleItem
                  isValid={passwordValid.upper}
                  text="At least 1 uppercase letter"
                />
                <RuleItem
                  isValid={passwordValid.lower}
                  text="At least 1 lowercase letter"
                />
              </div>

              <div className="space-y-1">
                <RuleItem
                  isValid={passwordValid.number}
                  text="At least 1 number"
                />
                <RuleItem
                  isValid={passwordValid.special}
                  text="At least 1 special character"
                />
              </div>
            </div>

            {errors.common && (
              <div className="bg-red-50 border border-red-300 text-red-700 rounded-md p-3 text-sm">
                {errors.common}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 mt-4"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="my-6 border-t border-border"></div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signup;
