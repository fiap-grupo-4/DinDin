import { HttpClient } from "@dindin/http";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const httpClient = new HttpClient(apiBaseUrl);
