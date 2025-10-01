import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Tenta fazer o login com o Firebase Auth
      await signInWithEmailAndPassword(auth, email, senha);
      
      // Se o login for bem-sucedido, navega para a página principal
      navigate('/principal');

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError('Usuário não cadastrado ou senha incorreta.');
    }
  };

  return (
    <div className="container">
      <h1>Página de Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Acessar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Não tem uma conta? <Link to="/">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
