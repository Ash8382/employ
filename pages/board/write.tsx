import { useState } from "react";
import { useRouter } from "next/router";

export default function WritePost() {
  const router = useRouter();
  const categoryFromQuery = (router.query.category as string) || "NOTICE";

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: categoryFromQuery,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://front-mission.bigs.or.kr/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "글 작성 실패");
        return;
      }
      alert("글 작성 성공");
      router.push("/board/notice");
    } catch {
      alert("서버 오류");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h1>글쓰기 (공지)</h1>
      <input
        name="title"
        placeholder="제목"
        value={form.title}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 12, padding: 8 }}
      />
      <textarea
        name="content"
        placeholder="내용"
        value={form.content}
        onChange={handleChange}
        style={{ width: "100%", height: 200, marginBottom: 12, padding: 8 }}
      />
      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        등록
      </button>
    </div>
  );
}
