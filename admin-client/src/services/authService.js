import { API_BASE_URL_WITH_API } from "../config/apiBase";

const API = `${API_BASE_URL_WITH_API}/auth`;

export const loginAdmin = async (data) => {
  try {
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    return await res.json()
  } catch (error) {
    return { message: "Network error. Please try again." }
  }
}
