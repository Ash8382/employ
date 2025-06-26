import api from "./api";

export interface SignupBody {
  username: string; // 이메일
  name: string;
  password: string;
  confirmPassword: string;
}

export async function signup(data: SignupBody) {
  return api.post("/auth/signup", data);
}

export async function login(username: string, password: string) {
  return api.post("/auth/login", { username, password });
}

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}
