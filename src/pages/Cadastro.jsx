import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // 1. Criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Gravar os dados adicionais no Firestore
      // Usamos o UID do usuário como ID do documento
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: user.email // Opcional, mas útil
      });

      // 3. Redirecionar para a página de login após o sucesso
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError('Falha ao cadastrar. Verifique os dados e tente novamente.');
      alert(error.message); // Mostra um alerta com a mensagem de erro do Firebase
    }
  };

  return (
    <div className="container">
      <h1>Página de Cadastro</h1>
      <form onSubmit={handleCadastro}>
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
          placeholder="Senha (mínimo 6 caracteres)"
          required
        />
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
          required
        />
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          placeholder="Data de Nascimento"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Já possui uma conta? <Link to="/login">Faça Login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
