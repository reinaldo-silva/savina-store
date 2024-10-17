import { ProductCard } from "@/components/ProductCard";

export default function SearchPage() {
  return (
    <div>
      <div>inicial</div>
      <section className="p-4">
        <h2>Prata</h2>
        <div className="flex gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
