import axios from "axios";
import { retrieveToken } from "../utils/secureStore";

const ApiManager = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
});

export const setupInterceptor = () => {
  ApiManager.interceptors.request.use(
    async (config) => {
      const token = await retrieveToken();
      console.log("Token récupéré dans l'intercepteur:", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token ajouté dans l'en-tête Authorization.");
      } else {
        console.log("Aucun token à ajouter à l'en-tête.");
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );
};

export default ApiManager;
