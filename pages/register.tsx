import { useState } from "react";
import { useRouter } from "next/router";
import "@/styles/global.scss";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("회원가입 호출");
    setError("");
    if (!form.username.includes("@")) {
      setError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (
      form.password.length < 8 ||
      !/[0-9]/.test(form.password) ||
      !/[a-zA-Z]/.test(form.password) ||
      !/[!%*#?&]/.test(form.password)
    ) {
      setError(
        "비밀번호는 8자 이상이며 숫자, 영문자, 특수문자(!%*#?&)를 포함해야 합니다."
      );
      return;
    }

    try {
      const res = await fetch("https://front-mission.bigs.or.kr/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "회원가입 실패");
        return;
      }

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (e) {
      setError("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>회원가입</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            name="username"
            placeholder="이메일 주소"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleSubmit}>회원가입</button>
        </form>
      </div>
    </div>
  );
}
