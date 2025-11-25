
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export { API_BASE };
