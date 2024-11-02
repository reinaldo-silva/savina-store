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
}

async function getProducts({
  cat = "",
  name = "",
}: {
  name?: string;
  cat?: string;
}): Promise<ApiResponse<Product[]>> {
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }

  if (cat) {
    params.append("category_ids", cat);
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

async function createProduct(
  productData: Omit<
    Product,
    "categories" | "created_at" | "updated_at" | "slug" | "id" | "images"
  > & {
    categories: { id: number }[];
  },
): Promise<string> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
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
    "categories" | "created_at" | "updated_at" | "slug" | "id" | "images"
  > & {
    categories: { id: number }[];
  },
): Promise<void> {
  console.log(productData);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
    },
  );

  if (!response.ok) {
    throw new Error("Falha no upload das imagens");
  }
}

async function deleteProduct(productId: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao deletar o produto");
  }
}

export {
  getProducts,
  getProductBySlug,
  createProduct,
  uploadProductImages,
  deleteProduct,
  updateProduct,
};

export type { Image, Product };
