import React from "react";

const categories = [
  { key: "notice", label: "공지" },
  { key: "free", label: "자유" },
  { key: "qna", label: "Q&A" },
  { key: "etc", label: "기타" },
];

type Props = {
  selected: string;
  onChange: (category: string) => void;
};

export default function CategoryTabs({ selected, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          style={{
            padding: "8px 16px",
            backgroundColor: selected === cat.key ? "#3182ce" : "#eee",
            color: selected === cat.key ? "#fff" : "#333",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
