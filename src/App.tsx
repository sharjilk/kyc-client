import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import React, { Suspense } from "react";

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </>
  );
};

export default App;
