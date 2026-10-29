const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiRequest(
  endpoint,
  { method = "GET", body, headers = {}, ...options } = {}
) {
  if (!API_BASE_URL) {
    throw new Error("API base URL is missing. Check your .env file.");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    method,
    credentials: "include",
    headers: {
      ...(body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...headers,
    },
    ...(body !== undefined
      ? { body: JSON.stringify(body) }
      : {}),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}