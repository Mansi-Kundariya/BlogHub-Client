import { Link } from "react-router-dom";
import { validatePassword } from "../../utils/validation";
import ResetPasswordController from "./ResetPasswordController";

const RuleItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
  <p
    className={`${
      isValid ? "text-green-600" : "text-red-600"
    } flex items-center gap-2 text-sm`}
  >
    <span>{isValid ? "✔" : "✘"}</span> {text}
  </p>
);

const ResetPassword = () => {
  const {
    isLoading,
    password,
    confirmPassword,
    passwordValid,
    errors,
    success,
    setPassword,
    setConfirmPassword,
    setPasswordValid,
    setErrors,
    handleReset,
  } = ResetPasswordController();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-border rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-purple-600">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          {!success ? (
            <form onSubmit={handleReset} className="space-y-6">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setErrors({ ...errors, common: "", password: "" });
                    setPassword(value);
                    setPasswordValid(validatePassword(value));
                  }}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-md bg-background text-sm focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  } outline-none`}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-purple-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setErrors({ ...errors, common: "", confirmPassword: "" });
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border border-border rounded-md bg-background text-sm focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  } outline-none`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Password Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 border p-4 rounded-lg">
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

              {/* Reset Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="bg-green-50 border border-green-300 text-green-700 rounded-md p-4">
                <p className="font-semibold">Success!</p>
                <p>Your password has been reset successfully.</p>
              </div>

              <Link
                to="/login"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md text-center"
              >
                Back to Login
              </Link>
            </div>
          )}

          {/* Back to Login */}
          {!success && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:underline font-semibold"
              >
                Back to Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
