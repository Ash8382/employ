import { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "../../utils/auth";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (pw: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;
    return regex.test(pw);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePassword(form.password)) {
      setError(
        "비밀번호는 8자 이상이며 숫자, 문자, 특수문자(!%*#?&)를 포함해야 합니다."
      );
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    try {
      await signup(form);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (e: any) {
      setError(e.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        type="email"
        placeholder="이메일"
        value={form.username}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <br />
      <input
        name="name"
        placeholder="이름"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <br />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <br />
      <input
        name="confirmPassword"
        type="password"
        placeholder="비밀번호 확인"
        value={form.confirmPassword}
        onChange={handleChange}
        disabled={loading}
        required
      />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
