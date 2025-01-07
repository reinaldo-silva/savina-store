import { Product } from "@/services/productService";

function findProductInArray(products: Product[], id: number) {
  const productFound = products.find((e) => e.id === id);

  return productFound ?? null;
}

export { findProductInArray };
