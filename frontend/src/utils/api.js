import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500",
  //timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  const response = await api.post("/getQuestions", data, {
    withCredentials: true,
  });
  return response.data;
};

export const getQuestion = async (data) => {
  const response = await api.post("/getQuestions/single", data, {
    withCredentials: true,
  });
  return response.data;
};
