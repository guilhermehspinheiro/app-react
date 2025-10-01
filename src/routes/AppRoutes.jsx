import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando as páginas
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Principal from '../pages/Principal';

const AppRoutes = () => {
  return (
    <Routes>
      {/* A rota de cadastro será a página inicial */}
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/principal" element={<Principal />} />
    </Routes>
  );
};

export default AppRoutes;
