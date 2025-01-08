import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";

const LoginPage = React.lazy(() => import("@/pages/Login"));
const RegisterPage = React.lazy(() => import("@/pages/Register"));
const UserDashboardPage = React.lazy(() => import("@/pages/UserDashboard"));
const AdminDashboardPage = React.lazy(() => import("@/pages/AdminDashboard"));
const AdminKpiPage = React.lazy(() => import("@/pages/AdminKpi"));

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <GuestRoute>
                    <RegisterPage />
                  </GuestRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <LoginPage />
                  </GuestRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute role="User">
                    <UserDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute role="Admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/kpi"
                element={
                  <ProtectedRoute role="Admin">
                    <AdminKpiPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </>
  );
};

export default App;
