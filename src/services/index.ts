interface ApiResponse<T = unknown> {
  statusCode: number;
  data: T;
  message: string;
  total?: number;
}

export type { ApiResponse };
