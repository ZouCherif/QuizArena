import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500",
  //timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const sendCode = async (email) => {
//   try {
//     const response = await api.post("/register/getVerificationCode", { email });
//     return response.data;
//   } catch (err) {}
// };

// export const verifyCode = async (data) => {
//   try {
//     const response = await api.post("/register/verifyCode", data);
//     return response.data;
//   } catch (err) {}
// };

export const createUser = async (data) => {
  try {
    const response = await api.post("/register", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {}
};
