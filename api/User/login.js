import ApiManager from "../ApiManager";

export const loginUser = async (username, password) => {
  try {
    const response = await ApiManager.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
