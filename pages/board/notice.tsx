import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

export default function NoticeBoard() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, [page]);

  return (
    <div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
