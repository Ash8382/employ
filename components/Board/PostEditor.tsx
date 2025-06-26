import { useState, useEffect } from "react";
import { Post, Category } from "../../types/post";

type Props = {
  initialPost?: Partial<Post>;
  onSubmit: (post: {
    category: Category;
    title: string;
    content: string;
  }) => void;
  loading?: boolean;
};

export default function PostEditor({ initialPost, onSubmit, loading }: Props) {
  const [category, setCategory] = useState<Category>(
    initialPost?.category || "notice"
  );
  const [title, setTitle] = useState(initialPost?.title || "");
  const [content, setContent] = useState(initialPost?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    onSubmit({ category, title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        disabled={loading}
      >
        <option value="notice">공지</option>
        <option value="free">자유</option>
        <option value="qna">Q&A</option>
        <option value="etc">기타</option>
      </select>
      <br />
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <br />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        disabled={loading}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "저장중..." : initialPost ? "수정하기" : "등록하기"}
      </button>
    </form>
  );
}
