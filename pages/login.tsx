import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      if (res.status === 200) {
        const { token, name } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userName", name);
        router.push("/");
      } else {
        setErrorMsg("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (error) {
      setErrorMsg("로그인 실패: 네트워크 오류 또는 서버 오류입니다.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>로그인</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="username" style={styles.label}>
          아이디 (이메일)
        </label>
        <input
          id="username"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="example@domain.com"
          required
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          required
          style={styles.input}
        />

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "60px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: 12,
    fontSize: 18,
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
};
