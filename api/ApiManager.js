// import axios from "axios";
// import { retrieveToken } from "../utils/secureStore";

// const ApiManager = axios.create({
//   baseURL: "http://localhost:3000/",
//   timeout: 5000,
// });

// export const setupInterceptor = () => {
//   ApiManager.interceptors.request.use(
//     async (config) => {
//       const token = await retrieveToken();
//       console.log("Token récupéré dans l'intercepteur:", token);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         console.log("Token ajouté dans l'en-tête Authorization.");
//       } else {
//         console.log("Aucun token à ajouter à l'en-tête.");
//       }
//       return config;
//     },
//     (error) => {
//       console.error("Request error:", error);
//       return Promise.reject(error);
//     }
//   );
// };

// export default ApiManager;

// ApiManager.js

import axios from "axios";
import { retrieveToken, removeToken } from "../utils/secureStore";
import { useAuth } from "../context/AuthContext"; // Assure-toi que useAuth est bien utilisé ici

const ApiManager = axios.create({
  baseURL: "http://localhost:3000/", // Vérifie que c'est bien l'URL correcte
  timeout: 5000,
});

export const setupInterceptor = (onLogout) => {
  // Intercepteur pour les requêtes
  ApiManager.interceptors.request.use(
    async (config) => {
      const token = await retrieveToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur pour les réponses
  ApiManager.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // Vérifie si le code d'état est 401 (Token expiré ou invalide)
      if (error.response && error.response.status === 401) {
        console.log("Token expiré ou invalide. Déconnexion en cours...");

        // Supprimer le token expiré
        await removeToken();

        // Appel de la fonction de déconnexion
        if (onLogout) {
          onLogout(); // La fonction signOut est appelée ici
        }

        // Optionnel: Affiche un message ou fais un traitement supplémentaire si nécessaire
        console.log("Déconnexion réussie.");
      }

      return Promise.reject(error);
    }
  );
};

export default ApiManager;
