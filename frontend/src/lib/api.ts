/**
 * Capa centralizada de acceso HTTP para el frontend.
 * Unifica headers, autenticación Bearer y manejo de errores,
 * reemplazando los fetch wrappers duplicados en cada página admin.
 */

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiFetchOptions {
  method?: HttpMethod;
  /** Token JWT del contexto de autenticación (opcional en endpoints públicos) */
  token?: string | null;
  /** Cuerpo serializable a JSON */
  body?: unknown;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = 'GET', token, body } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string };
    throw new ApiError(err.message ?? 'Ocurrió un error en la solicitud.', res.status);
  }

  return res.json() as Promise<T>;
}
