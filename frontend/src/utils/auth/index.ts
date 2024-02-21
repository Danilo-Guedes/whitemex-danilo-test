import { jwtDecode } from "jwt-decode"; // Add this import statement

export function checkAuth(): {
  userData: string | null;
  token: string | null;
} {
  const userToken = localStorage.getItem("user-token");

  if (!userToken) {
    throw new Error('User not authenticated');
  }

  const decodedToken = jwtDecode(userToken);

  const { exp } = decodedToken;

  if (exp && Date.now() >= exp * 1000) {
    console.log("Token expired");
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-data");
    throw new Error('Token expired');
  }

  const userData = localStorage.getItem("user-data");

  const data = { userData, token: userToken };

  return data;
}

export function logout() {
  localStorage.removeItem("user-token");
  localStorage.removeItem("user-data");
}
