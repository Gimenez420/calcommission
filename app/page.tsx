"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import { Sale } from "@/types/sale";
import { getSales } from "@/lib/storage";

export default function Home() {
  const [sales, setSales] = useState<Sale[]>(() => getSales());

  return (
    <main>
      <h1>MiiN Commission</h1>

      <Dashboard
        sales={sales}
        onSaleAdded={(newSale) => {
          setSales((currentSales) => [...currentSales, newSale]);
        }}
      />
    </main>
  );
}