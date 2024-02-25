import { CreateTransactionForm, CreatedReturn } from "@/types/forms";
import apiClient from ".";

export async function getTransactionsApi() {
  try {
    const resp = await apiClient.get("/transactions");
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTransactionsByIdApi(id: string) {
  try {
    const resp = await apiClient.get(`/transactions/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTransactionApi(data : CreateTransactionForm) : Promise<CreatedReturn> {
  try {
    const resp = await apiClient.post<CreatedReturn>("/transactions/create", data);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
