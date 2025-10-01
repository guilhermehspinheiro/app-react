import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

const Principal = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Escuta mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuário está logado, buscar dados no Firestore
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Documento não encontrado, talvez um erro de cadastro
          console.error("Documento do usuário não encontrado no Firestore!");
          handleLogout(); // Desloga o usuário se os dados não existem
        }
      } else {
        // Usuário não está logado, redirecionar para a página de login
        navigate('/login');
      }
      setLoading(false);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redireciona para o login após o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return <div className="container"><h1>Carregando...</h1></div>;
  }

  return (
    <div className="container">
      <h1>Página Principal</h1>
      {userData ? (
        <div className="user-data">
          <h2>Bem-vindo(a), {userData.nome}!</h2>
          <p><strong>Nome Completo:</strong> {userData.nome} {userData.sobrenome}</p>
          <p><strong>E-mail:</strong> {userData.email}</p>
          <p><strong>Data de Nascimento:</strong> {userData.dataNascimento}</p>
        </div>
      ) : (
        <p>Não foi possível carregar os dados do usuário.</p>
      )}
      <button onClick={handleLogout} className="logout-button">Sair</button>
    </div>
  );
};

export default Principal;
