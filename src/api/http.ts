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

async function checkResponse(res: Response): Promise<void> {
  if (res.status === 401) throw new UnauthorizedError();
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const detail = body?.detail;
    const message = Array.isArray(detail)
      ? detail.map((e: { msg: string }) => e.msg).join(", ")
      : typeof detail === "string"
      ? detail
      : String(res.status);
    throw new Error(message);
  }
}

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`, { headers: authHeaders() });
  await checkResponse(res);
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
  await checkResponse(res);
  return res.json() as Promise<T>;
}

export async function mutateVoid(path: string, method: string): Promise<void> {
  const res = await fetch(`/api${path}`, { method, headers: authHeaders() });
  await checkResponse(res);
}

export async function mutateFormData<T>(path: string, form: FormData): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  await checkResponse(res);
  return res.json() as Promise<T>;
}
