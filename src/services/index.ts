interface ApiResponse<T = unknown> {
  statusCode: number;
  data: T | null;
  message: string;
  total?: number;
}

export type { ApiResponse };
