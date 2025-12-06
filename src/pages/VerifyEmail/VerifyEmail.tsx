import { Link } from "react-router-dom";
import VerifyEmailController from "./VerifyEmailController";

const VerifyEmail = () => {
  const {
    isLoading,
    otp,
    error,
    success,
    setOtp,
    setError,
    handleVerify,
    handleResend,
    resendTimer,
  } = VerifyEmailController();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-border shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-600 mb-2">
              Verify Your Email
            </h1>
            <p className="text-sm text-muted-foreground">
              We've sent a verification code to your email. Please enter it
              below to continue.
            </p>
          </div>

          {/* Form */}
          {!success ? (
            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Field */}
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-semibold text-purple-600 mb-2"
                >
                  Verification Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setError({ ...error, common: "", otp: "" });
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                  }}
                  placeholder="000000"
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-md bg-secondary text-foreground text-sm text-center placeholder-muted-foreground focus:outline-none focus:ring-2 ${
                    error.otp
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-purple-500"
                  } tracking-widest font-mono text-lg`}
                  // required
                />
                {error.otp && (
                  <p className="text-red-600 text-sm mt-1">{error.otp}</p>
                )}
              </div>

              {/* Error Message */}
              {error.common && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-800">{error.common}</p>
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-sm font-semibold text-green-800 mb-1">
                  Email Verified!
                </p>
                <p className="text-sm text-green-700">
                  Your email has been successfully verified. You can now access
                  your account.
                </p>
              </div>
              <Link
                to="/login"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors text-center"
              >
                Continue to Login
              </Link>
            </div>
          )}

          {/* Divider */}
          {!success && <div className="my-6 border-t border-border"></div>}

          {/* Resend Code */}
          {!success && (
            <p className="text-center text-sm text-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`font-semibold ${
                  resendTimer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
              </button>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
