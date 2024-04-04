import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500",
  //timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      // Si la réponse a un statut 401 et qu'elle n'est pas déjà en cours de réessai
      error.config._retry = true; // Marquez la requête comme en cours de réessai pour éviter une boucle infinie

      try {
        // Demandez le rafraîchissement de l'access token
        const res = await api.post('/login/refreshAccessToken');
        const newAccessToken = res.data.accessToken;
        
        // Mettez à jour l'access token dans la requête d'origine
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        
        // Réexécutez la requête d'origine avec le nouvel access token
        return axios(error.config);
      } catch (refreshError) {
        console.error("Erreur lors du rafraîchissement de l'access token:", refreshError);
        return Promise.reject(refreshError); // Rejetez la promesse avec l'erreur de rafraîchissement
      }
    }
    return Promise.reject(error); // Rejetez la promesse avec l'erreur d'origine
  }
);
export const sendCode = async (email) => {
  const response = await api.post("/register/getVerificationCode", { email });
  return response.data;
};

export const verifyCode = async (data) => {
  const response = await api.post("/register/verifyCode", data);
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post("/register", data, {
    withCredentials: true,
  });
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/login", data, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async (data) => {
  try {
    const response = await api.get("/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getQuestions = async (data) => {
  const response = await api.post("/questions", data, {
    withCredentials: true,
  });
  return response.data;
};

export const getQuestion = async (data) => {
  const response = await api.post("/questions/single", data, {
    withCredentials: true,
  });
  return response.data;
};

export const saveQuestions = async (data) => {
  const response = await api.post("/questions/save", data, {
    withCredentials: true,
  });
  return response.data;
};

export const joinSession = async (sessionCode) => {
  const response = await api.get(`/join/${sessionCode}`, {
    withCredentials: true,
  });
  return response.data;
};
<<<<<<< HEAD
export const getUsersRank = async (data) => {
  try {
    const response = await api.get("/ranking",data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users from:", error);
    throw error;
  }
};
=======

export const getSessionCode = async (id) => {
  const response = await api.get(`/join/getCode/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
>>>>>>> 778ca9bc0373efdeec0c8923070fa37ab887c86f
