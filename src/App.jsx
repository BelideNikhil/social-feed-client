import { Navigate, Route, Routes } from "react-router";
import { Feed } from "./components/Feed";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/auth.context";
import { PublicRoute } from "./components/PublicRoute";
import { NotFound } from "./components/NotFound";
import { DashboardLayout } from "./components/DashboardLayout";
import { ModalProvider } from "./context/modal.context";

function App() {
  return (
    // context providers
    <AuthProvider>
      <ModalProvider>
        <div className="container">
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              {/* wrapper */}
              {/* index is /, when user hits this, we redirect him to /feed immediately */}
              <Route index element={<Navigate to="/feed" replace />} />
              <Route element={<DashboardLayout />}>
                <Route path="/feed" element={<Feed />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
