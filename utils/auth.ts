// 토큰 저장
export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

// 토큰 가져오기
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// 토큰 제거
export function logout() {
  localStorage.removeItem("token");
}

// JWT 디코딩
export function parseJwt(token: string): { id: string; name: string } | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return { id: decoded.id, name: decoded.name };
  } catch (e) {
    return null;
  }
}
