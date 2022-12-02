import axios from "axios";
import { accountService } from "./account.service";

// Création de la relation avec l'API
const Axios = axios.create({
  baseURL: "http://localhost:3000/api/",
});

// Interception de la requête, vérification du token enregistré dans le localStorage et insertion de ce dernier dans le header d'autorisation
Axios.interceptors.request.use((request) => {
  let token = accountService.getToken();

  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }

  return request;
});

export default Axios;
