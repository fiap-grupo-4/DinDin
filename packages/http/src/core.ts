export class HttpClient {
  private baseUrl!: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this._fetch<T>(url, { method: "GET", ...options });
  }

  async post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return this._fetch<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }

  async patch<T>(
    url: string,
    body: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return this._fetch<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    });
  }

  async put<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return this._fetch<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this._fetch<T>(url, { method: "DELETE", ...options });
  }

  private async _fetch<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
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
  }
}
