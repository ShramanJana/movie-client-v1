import api from "./axiosConfig"
export const signUp = (user) => {
  return api
    .post("/api/v1/movies/register", {
      userName: user.username,
      password: user.password,
    })
    .then((response) => response.data);
};

export const userLogin = (user) => {
  return api
    .post("/api/v1/movies/login", {
      userName: user.username,
      password: user.password,
    })
    .then((response) => response.data);
};
