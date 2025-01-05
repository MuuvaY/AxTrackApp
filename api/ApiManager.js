import axios from "axios";
import { retrieveToken, removeToken } from "../utils/secureStore";
import { useAuth } from "../context/AuthContext";

const ApiManager = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});

export const setupInterceptor = (onLogout) => {
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

  ApiManager.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Token expiré ou invalide. Déconnexion en cours...");

        await removeToken();

        if (onLogout) {
          onLogout();
        }

        console.log("Déconnexion réussie.");
      }

      return Promise.reject(error);
    }
  );
};

export default ApiManager;
