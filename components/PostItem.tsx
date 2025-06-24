import styled from "styled-components";
import { Post } from "../types/post";

const PostBox = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;

  p {
    font-size: 1rem;
    margin-bottom: 12px;
    word-break: break-word;
  }

  button {
    margin-right: 8px;
    padding: 6px 12px;
    border: none;
    background-color: #0070f3;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #005bb5;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }

    button {
      padding: 5px 10px;
      font-size: 0.85rem;
    }
  }
`;

type Props = {
  post: Post;
  userId: string | undefined;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
};

export default function PostItem({ post, userId, onEdit, onDelete }: Props) {
  return (
    <PostBox>
      <p>{post.content}</p>
      {userId === post.userId && (
        <>
          <button onClick={() => onEdit(post)}>수정</button>
          <button onClick={() => onDelete(post.id)}>삭제</button>
        </>
      )}
    </PostBox>
  );
}
