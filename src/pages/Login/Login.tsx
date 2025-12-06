import { Link } from "react-router-dom";
import LoginController from "./LoginController";

const Login = () => {
  const {
    isLoading,
    email,
    password,
    errors,
    setEmail,
    setPassword,
    setErrors,
    handleLogin,
  } = LoginController();
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-border shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-600 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "", common: "" });
                }}
                placeholder="you@example.com"
                className={`w-full px-4 py-2 border rounded-md text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-purple-500"
                }`}
                // required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "", common: "" });
                }}
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-md text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-purple-500"
                }`}
                // required
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <Link
              to="/forgot-password"
              className="flex items-center justify-end text-sm text-muted-foreground hover:text-purple-600 my-2"
            >
              Forgot Password?
            </Link>

            {/* Error Box */}
            {errors.common && (
              <div className="bg-red-50 border border-red-300 text-red-700 rounded-md p-3 text-sm">
                {errors.common}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full m-0 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-border"></div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
