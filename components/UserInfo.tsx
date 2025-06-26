import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function UserInfo() {
  const [user, setUser] = useState<{ username: string; name: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div
      style={{
        padding: "12px 16px",
        background: "#f4f4f4",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div>
        <strong>{user.name}</strong> 님 (아이디: {user.username})
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: "6px 10px",
          fontSize: "13px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
