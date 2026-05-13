const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 1;

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | object | null;
  timeoutMs?: number;
  retries?: number;
  query?: Record<string, string | number | boolean | null | undefined>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data: T;
  meta?: unknown;
};

const getBaseUrl = () => {
  const configured = process.env.NEXT_PUBLIC_API_URL;

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000/api";
  }

  throw new Error("NEXT_PUBLIC_API_URL is required in production.");
};

const buildUrl = (
  path: string,
  query?: Record<string, string | number | boolean | null | undefined>,
) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getBaseUrl()}${normalizedPath}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

const parseResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const text = await response.text();
  const payload = text ? (JSON.parse(text) as ApiResponse<T>) : ({ data: null } as ApiResponse<T>);

  if (!response.ok) {
    throw new ApiError(
      payload.message || `Request failed with status ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload;
};

const isRetryable = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.status >= 500 || error.status === 408 || error.status === 429;
  }

  return error instanceof TypeError;
};

export async function apiRequest<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<ApiResponse<T>> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
    query,
    headers,
    body,
    signal,
    ...init
  } = options;

  let attempt = 0;

  while (true) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const onAbort = () => controller.abort();
    signal?.addEventListener("abort", onAbort, { once: true });

    try {
      const response = await fetch(buildUrl(path, query), {
        credentials: "include",
        ...init,
        headers: {
          ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
          ...headers,
        },
        body:
          body && !(body instanceof FormData) && typeof body !== "string"
            ? JSON.stringify(body)
            : body,
        signal: controller.signal,
      });

      return await parseResponse<T>(response);
    } catch (error) {
      if (attempt >= retries || !isRetryable(error)) {
        throw error;
      }

      attempt += 1;
      await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
    } finally {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", onAbort);
    }
  }
}

export const apiClient = {
  get: <T>(path: string, options?: ApiClientOptions) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: object, options?: ApiClientOptions) =>
    apiRequest<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: object, options?: ApiClientOptions) =>
    apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: ApiClientOptions) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
