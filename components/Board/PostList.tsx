import { Post } from "../../types/post";

type Props = {
  posts: Post[];
  onPostClick: (id: string) => void;
};

export default function PostList({ posts, onPostClick }: Props) {
  if (posts.length === 0) return <p>게시글이 없습니다.</p>;

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {posts.map((post) => (
        <li
          key={post.id}
          style={{
            padding: "12px",
            borderBottom: "1px solid #ddd",
            cursor: "pointer",
          }}
          onClick={() => onPostClick(post.id)}
        >
          [{post.category.toUpperCase()}] {post.title} - 작성자: {post.userId}
        </li>
      ))}
    </ul>
  );
}
