import axiosClient from "./axiosClient";

export const loginAPi = (formData) => {
  return axiosClient.post("/api/auth/login", formData);
};

export const registerApi = (formData) => {
  return axiosClient.post("/api/auth/register", formData);
};

export const getUserInfo = () => {
  return axiosClient.get("/api/auth");
};

export const editUser = (userInfo) => {
  return axiosClient.put("/api/auth", userInfo);
};
