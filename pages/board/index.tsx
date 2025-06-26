import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  category: string;
  createdAt: string;
};

export default function BoardList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const size = 10;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function fetchPosts() {
      if (!token) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://front-mission.bigs.or.kr/boards?page=${page}&size=${size}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) {
          setError("게시글을 불러오는 데 실패했습니다.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch {
        setError("서버와 통신 중 오류가 발생했습니다.");
        setLoading(false);
      }
    }
    fetchPosts();
  }, [page, token]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>게시판 목록</h2>
      <Link href="/board/write">
        <button style={{ marginBottom: 20 }}>글쓰기</button>
      </Link>
      <table
        width="100%"
        border={1}
        cellPadding={8}
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>카테고리</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                게시글이 없습니다.
              </td>
            </tr>
          )}
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <Link href={`/board/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.category}</td>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          이전
        </button>
        <span style={{ margin: "0 10px" }}>페이지 {page + 1}</span>
        <button onClick={() => setPage((p) => p + 1)}>다음</button>
      </div>
    </div>
  );
}
