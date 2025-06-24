import { useState, useEffect } from "react";
import styled from "styled-components";

const Editor = styled.div`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    min-height: 80px;
  }
`;

const Button = styled.button<{ isEditing?: boolean }>`
  background-color: ${({ isEditing }) => (isEditing ? "#f39c12" : "#0070f3")};
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ isEditing }) => (isEditing ? "#d78c0a" : "#005bb5")};
  }

  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
`;

type Props = {
  initialContent?: string;
  onSubmit: (content: string) => void;
  isEditing?: boolean;
};

export default function PostEditor({
  initialContent = "",
  onSubmit,
  isEditing,
}: Props) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <Editor>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요."
      />
      <Button onClick={handleSubmit} isEditing={isEditing}>
        {isEditing ? "수정" : "등록"}
      </Button>
    </Editor>
  );
}
