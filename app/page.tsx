import { brands } from "@/data/brand"
import { sales } from "@/data/sales";
import { calculateTotalCommission } from "@/lib/commissions"

export default function Home() {
  const totalCommission = calculateTotalCommission(
    sales,
    brands
  )

  return (
    <main>
      <h1>MiiN Commission</h1>

      <p>Comision total: {totalCommission} €</p>
    </main>
  );
}