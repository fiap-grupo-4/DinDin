import { HttpClient } from '@dindin/http';

export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL ?? '');
