const fetchApi = async <T>(url: string, options: RequestInit): Promise<T> => {
  const res = await fetch(`${process.env.API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP error — status: ${res.status}`);
  }

  return res.json() as Promise<T>;
};

export const httpClient = {
  get: async <T>(url: string, options?: RequestInit) =>
    fetchApi<T>(url, { method: "GET", ...options }),
  post: async <T>(url: string, body: unknown, options?: RequestInit) =>
    fetchApi<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),
  patch: async <T>(url: string, body: unknown, options?: RequestInit) =>
    fetchApi<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),
  put: async <T>(url: string, body: unknown, options?: RequestInit) =>
    fetchApi<T>(url, { method: "PUT", body: JSON.stringify(body), ...options }),
  delete: async <T>(url: string, options?: RequestInit) =>
    fetchApi<T>(url, { method: "DELETE", ...options }),
};
