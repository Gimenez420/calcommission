import { brands } from "@/data/brand"
import { sales } from "@/data/sales";
import { 
  calculateDailyCommission,
  calculateMonthlyCommission,
} from "@/lib/commissions"

export default function Home() {
  const dailyCommission = calculateDailyCommission(
    sales,
    brands,
    "2026-09-03"
  )

  const monthlyCommission = calculateMonthlyCommission(
    sales,
    brands,
    2026,
    8
  )

  return (
    <main>
      <h1>MiiN Commission</h1>

      <p>Comision total hoy: {dailyCommission} €</p>
      <p>Comision total mes: {monthlyCommission} €</p>
    </main>
  );
}