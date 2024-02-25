import { SignUpForm } from "@/types/forms";
import apiClient from ".";

export async function createUserApi(user : SignUpForm) {
  try {
    const resp = await apiClient.post("/users/create", user);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getUserProfileApi() {
  try {
    const resp = await apiClient.get("/users/me", );
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUsersApi() {
  try {
    const resp = await apiClient.get("/user");
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
