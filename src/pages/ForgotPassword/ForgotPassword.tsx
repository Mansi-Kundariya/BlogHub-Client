import { Link } from "react-router-dom";
import ForgotPasswordController from "./ForgotPasswordController";

export default function ForgotPasswordPage() {
  const { isLoading, email, submitted, setEmail, setSubmitted, handleSubmit } =
    ForgotPasswordController();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-border shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-600 mb-2">
              Forgot Password?
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-purple-600 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-border rounded-md text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your registered email address
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-sm text-green-800">
                  Check your email for a password reset link. The link will
                  expire in 15 minutes.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Send Another Link
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="my-6 border-t border-border"></div>

          {/* Back to Login */}
          <p className="text-center text-sm text-foreground">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
