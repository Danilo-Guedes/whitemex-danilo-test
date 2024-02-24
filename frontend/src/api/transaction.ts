import apiClient from ".";

export async function getTransactionsApi() {
  try {
    // const resp = await apiClient.get("/events");
    // return resp.data;
    return "hello world";
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTransactionsByIdApi(id: string) {
  try {
    const resp = await apiClient.get(`/events/${id}`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTransactionApi() {
  try {
    // const resp = await apiClient.post("/events/create-event", data);
    // return resp.data;
    return "hello world";
  } catch (error) {
    console.error(error);
    throw error;
  }
}
