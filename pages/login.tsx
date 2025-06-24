import { useState } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import api from "../utils/api";
import { saveToken } from "../utils/auth";
import Layout from "../components/Layout";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (id: string, pw: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { id, pw });
      saveToken(res.data.token);
      router.push("/");
    } catch {
      alert("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (id: string, pw: string, name: string) => {
    setLoading(true);
    try {
      await api.post("/auth/signup", { id, pw, name });
      alert("회원가입 완료! 로그인 해주세요.");
    } catch {
      alert("회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>로그인 / 회원가입</h1>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
      {loading && <p>처리중...</p>}
    </Layout>
  );
}
