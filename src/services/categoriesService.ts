import { ApiResponse } from ".";

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

async function getCategories(): Promise<ApiResponse<Category[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    next: { revalidate: 120, tags: ["categories"] },
  });

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
}

export { getCategories };

export type { Category };
