import { useState } from "react";
import Link from "next/link";
import UserInfo from "@/components/UserInfo";

export default function Home() {
  const categories = ["공지", "자유", "Q&A", "기타"];
  const [selectedCategory, setSelectedCategory] = useState("공지");
  const user =
    typeof window !== "undefined" ? localStorage.getItem("userName") : null;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: "1.8rem",
            color: "#222",
          }}
        >
          더드림 솔루션
        </h1>

        <nav style={{ display: "flex", gap: "12px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: "none",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: selectedCategory === cat ? "bold" : "normal",
                color: selectedCategory === cat ? "#0070f3" : "#444",
                borderBottom:
                  selectedCategory === cat
                    ? "2px solid #0070f3"
                    : "2px solid transparent",
                transition: "color 0.3s, border-bottom 0.3s",
              }}
            >
              {cat}
            </button>
          ))}
        </nav>

        <nav style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {user ? (
            <>
              <span style={{ fontWeight: "500", color: "#333" }}>
                <UserInfo />님 환영합니다
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userName");
                  location.reload();
                }}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  borderRadius: 6,
                  border: "1px solid #e53e3e",
                  backgroundColor: "#fff",
                  color: "#e53e3e",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e53e3e";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#e53e3e";
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  padding: "8px 18px",
                  backgroundColor: "#0070f3",
                  color: "white",
                  borderRadius: 6,
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#005bb5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0070f3")
                }
              >
                로그인
              </Link>
              <Link
                href="/register"
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  fontWeight: "600",
                  textDecoration: "none",
                  border: "2px solid #0070f3",
                  color: "#0070f3",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0070f3";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#0070f3";
                }}
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* 메인 콘텐츠 */}
      <section>
        <h2>{selectedCategory} 게시판</h2>
      </section>
    </div>
  );
}
