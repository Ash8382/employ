import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function PostView() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    if (!postId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://front-mission.bigs.or.kr/boards/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("조회 실패");
      const data = await res.json();
      setPost(data);
    } catch {
      alert("글 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (!postId) return;
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://front-mission.bigs.or.kr/boards/${postId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("삭제 실패");
      alert("삭제 성공");
      router.push("/board/notice");
    } catch {
      alert("삭제 실패");
    }
  };

  const handleEdit = () => {
    router.push(`/board/write?postId=${postId}&category=NOTICE`);
  };

  if (loading) return <p>로딩중...</p>;
  if (!post) return <p>게시글이 없습니다.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <button onClick={handleEdit} style={{ marginRight: 10 }}>
        수정
      </button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}
