interface Image {
  id: number;
  product_id: number;
  image_url: string;
  public_id: string;
  is_cover: boolean;
  created_at: string;
  updated_at: string;
}

async function deleteImage(publicId: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/image/${publicId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao deletar a imagem");
  }
}

export { deleteImage };

export type { Image };
