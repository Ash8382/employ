export type Category = "notice" | "free" | "qna" | "etc";

export interface Post {
  id: string;
  userId: string;
  category: Category;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}
