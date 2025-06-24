import { useState } from "react";
import styled from "styled-components";

const Form = styled.div`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    padding: 10px 14px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #0070f3;
    }
  }

  button {
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s ease;
  }

  button.login {
    background-color: #0070f3;

    &:hover {
      background-color: #005bb5;
    }
  }

  button.register {
    background-color: #2ecc71;

    &:hover {
      background-color: #27ae60;
    }
  }

  @media (max-width: 480px) {
    max-width: 100%;
    input,
    button {
      font-size: 0.9rem;
      padding: 10px;
    }
  }
`;

type Props = {
  onLogin: (id: string, pw: string) => void;
  onRegister: (id: string, pw: string, name: string) => void;
};

export default function LoginForm({ onLogin, onRegister }: Props) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  return (
    <Form>
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="login" onClick={() => onLogin(id, pw)}>
        로그인
      </button>
      <button className="register" onClick={() => onRegister(id, pw, name)}>
        회원가입
      </button>
    </Form>
  );
}
