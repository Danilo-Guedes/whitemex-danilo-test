import apiClient from ".";
import { LoginForm } from "@/types/forms";

export async function userLogin(form: LoginForm) {
  try {
    const resp = await apiClient.post("/auth/login", form);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
