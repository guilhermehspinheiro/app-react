// Importando as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8mBv92IBPq5SmjwJMfH1IhvOO_3RXx7Y",
  authDomain: "react-cadastro-app.firebaseapp.com",
  projectId: "react-cadastro-app",
  storageBucket: "react-cadastro-app.firebasestorage.app",
  messagingSenderId: "891973180331",
  appId: "1:891973180331:web:37fdb40ed799a39b3e50ee"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando os serviços que vamos usar
const auth = getAuth(app);
const db = getFirestore(app);

// Exportando os serviços para que possam ser usados em outras partes da aplicação
export { auth, db };
