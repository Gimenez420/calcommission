"use client";

import { brands } from "@/data/brand";
import { calculateDailyCommission, calculateMonthlyCommission } from "@/lib/commissions";
import { Sale } from "@/types/sale";

type DashboardProps = {
  sales: Sale[];
};

export default function Dashboard({ sales }: DashboardProps) {
  const today = new Date().toISOString().split("T")[0];

  const currentDate = new Date();

  const dailyCommission = calculateDailyCommission(
    sales,
    brands,
    today
  );

  const monthlyCommission = calculateMonthlyCommission(
    sales,
    brands,
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <section>
      <div>
        <h2>Comisión de hoy</h2>
        <p>{dailyCommission.toFixed(2)} €</p>
      </div>

      <div>
        <h2>Comisión del mes</h2>
        <p>{monthlyCommission.toFixed(2)} €</p>
      </div>
    </section>
  );
}