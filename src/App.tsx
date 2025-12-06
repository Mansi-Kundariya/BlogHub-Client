import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import "./styles/globals.css";
import "./styles/tailwind.css";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <Toaster />
      <AppRoutes />
    </AuthProvider>
  );
}
