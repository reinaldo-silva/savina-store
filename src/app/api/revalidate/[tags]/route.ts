import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: { tags: string } },
) {
  const tags = context.params.tags || "";

  tags.split(",").forEach((tag) => {
    revalidateTag(tag);
  });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
