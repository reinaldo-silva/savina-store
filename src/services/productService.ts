import { ApiResponse } from ".";
import { Category } from "./categoriesService";

interface Image {
  id: number;
  product_id: number;
  image_url: string;
  public_id: string;
  is_cover: boolean;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  images: Image[];
  categories: Category[];
  created_at: string;
  updated_at: string;
  available: boolean;
}

async function getProducts({
  cat = "",
  name = "",
  size = "",
}: {
  name?: string;
  cat?: string;
  size?: string;
}): Promise<ApiResponse<Product[]>> {
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }

  if (cat) {
    params.append("category_ids", cat);
  }

  if (size) {
    params.append("pageSize", size);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`,
    {
      next: { revalidate: 120, tags: ["products"] },
    },
  );

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
}

async function getProductsToAdmin({
  cat = "",
  name = "",
  size = "",
  token,
}: {
  token: string;
  name?: string;
  cat?: string;
  size?: string;
}): Promise<ApiResponse<Product[]>> {
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }

  if (cat) {
    params.append("category_ids", cat);
  }

  if (size) {
    params.append("pageSize", size);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/to-admin?${params.toString()}`,
    {
      next: { revalidate: 120, tags: ["products"] },
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
}

async function getProductBySlug({
  slug,
}: {
  slug: string;
}): Promise<ApiResponse<Product>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
    {
      next: { revalidate: 120, tags: ["products"] },
    },
  );

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
}

async function getProductBySlugToAdmin({
  slug,
  token,
}: {
  slug: string;
  token: string;
}): Promise<ApiResponse<Product>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/to-admin/${slug}`,
    {
      next: { revalidate: 120, tags: ["products"] },
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
}

async function getProductImagesBySlug({
  slug,
  token,
}: {
  slug: string;
  token: string;
}): Promise<ApiResponse<Image[]>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/images`,
    {
      next: { revalidate: 120, tags: ["products"] },
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
}

async function createProduct({
  data,
  token,
}: {
  data: Omit<
    Product,
    | "categories"
    | "created_at"
    | "updated_at"
    | "slug"
    | "id"
    | "images"
    | "available"
  > & {
    categories: { id: number }[];
  };
  token: string;
}): Promise<string> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha na criação do produto");
  }

  const createdProduct = await response.json();

  return createdProduct.data.slug;
}

async function updateProduct(
  productSlug: string,
  productData: Omit<
    Product,
    | "categories"
    | "created_at"
    | "updated_at"
    | "slug"
    | "id"
    | "images"
    | "available"
  > & {
    categories: { id: number }[];
  },
  token: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao atualizar o produto: ${response.statusText}`);
  }

  await response.json();
}

async function uploadProductImages(
  productId: string,
  images: File[],
  token: string,
): Promise<void> {
  const form = new FormData();

  images.forEach((image) => {
    form.append("images", image);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/upload-image`,
    {
      method: "PATCH",
      body: form,
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Falha no upload das imagens");
  }
}

async function setProductCoverImage(
  slugId: string,
  publicId: string,
  token: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slugId}/cover/${publicId}`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao definir o cover");
  }
}

async function switchAvailable(slugId: string, token: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slugId}/available/switch`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }
}

async function deleteProduct(productId: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao deletar o produto");
  }
}

async function stockEntry(
  slug: string,
  quantity: number,
  token: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/stock-entry`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    },
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }
}

async function stockOut(
  slug: string,
  quantity: number,
  token: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/stock-out`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    },
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.message);
  }
}

export {
  getProducts,
  getProductBySlug,
  createProduct,
  uploadProductImages,
  deleteProduct,
  updateProduct,
  getProductImagesBySlug,
  setProductCoverImage,
  getProductsToAdmin,
  getProductBySlugToAdmin,
  switchAvailable,
  stockEntry,
  stockOut,
};

export type { Image, Product };
