import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../components/Layout";
import PostEditor from "../components/PostEditor";
import PostItem from "../components/PostItem";
import api from "../utils/api";
import { getToken, parseJwt, logout } from "../utils/auth";
import { Post } from "../types/post";

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const UserInfo = styled.p`
  margin-bottom: 20px;
  text-align: center;

  button {
    margin-left: 12px;
    padding: 6px 12px;
    background-color: #e53e3e;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #c53030;
    }
  }
`;

const Pagination = styled.div`
  margin-top: 20px;
  text-align: center;

  button {
    margin: 0 8px;
    padding: 8px 14px;
    background-color: #3182ce;
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #2b6cb0;
    }

    &:disabled {
      background-color: #a0aec0;
      cursor: default;
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [editPost, setEditPost] = useState<Post | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    const payload = parseJwt(token);
    if (!payload) {
      logout();
      router.push("/login");
      return;
    }
    setUser({ id: payload.id, name: payload.name });
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (page: number) => {
    try {
      const res = await api.get(`/posts?page=${page}`);
      setPosts(res.data);
    } catch {
      alert("게시글 불러오기 실패");
    }
  };

  const handlePostSubmit = async (content: string) => {
    try {
      if (!user) return;
      if (editPost) {
        await api.put(`/posts/${editPost.id}`, { content });
        setEditPost(null);
      } else {
        await api.post("/posts", { content });
      }
      fetchPosts(page);
    } catch {
      alert("글 저장 실패");
    }
  };

  const handleEdit = (post: Post) => {
    setEditPost(post);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts(page);
    } catch {
      alert("삭제 실패");
    }
  };

  return (
    <Layout>
      <PageTitle>게시판</PageTitle>
      <UserInfo>
        로그인 사용자: {user?.id} ({user?.name})
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          로그아웃
        </button>
      </UserInfo>

      <PostEditor
        initialContent={editPost?.content || ""}
        isEditing={Boolean(editPost)}
        onSubmit={handlePostSubmit}
      />

      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          userId={user?.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <Pagination>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          이전
        </button>
        <button onClick={() => setPage((p) => p + 1)}>다음</button>
      </Pagination>
    </Layout>
  );
}
