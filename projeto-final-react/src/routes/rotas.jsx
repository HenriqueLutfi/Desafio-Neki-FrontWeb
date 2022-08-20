import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Login } from "../Pages/Login";
import { AuthContext } from "../context/AuthContext";
import { CadastroUser } from "../Pages/Cadastro";
import { Home } from "../Pages/Home";

function initialPage() {
  const { token } = useContext(AuthContext);
  return token || localStorage.getItem("Authorization") ? (
    <Navigate to={{ pathname: "/home" }} />
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
}

export function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={initialPage()} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUser />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/login" element={<Login/>} />
              <Route path="/cadastro" element={<Cadastro/>} /> */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}
