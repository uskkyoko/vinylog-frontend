export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

let _token: string | null = null;

export function setAuthToken(t: string | null) {
  _token = t;
}

export function authHeaders(json = false): Record<string, string> {
  const headers: Record<string, string> = {};
  if (_token) headers["Authorization"] = `Bearer ${_token}`;
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`, { headers: authHeaders() });
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function mutateJSON<T>(
  path: string,
  method: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method,
    headers: authHeaders(body !== undefined),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json() as Promise<T>;
}

export async function mutateVoid(path: string, method: string): Promise<void> {
  const res = await fetch(`/api${path}`, { method, headers: authHeaders() });
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) throw new Error(`${res.status}`);
}
