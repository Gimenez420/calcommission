"use client"

import { useState } from "react"
import Dashboard from "@/components/Dashboard"
import { Sale } from "@/types/sale"
import { getSales } from "@/lib/storage"

export default function Home() {
  const [sales, setSales] = useState<Sale[]>(() => getSales())


  return (
    <main className="mint-h-screen bg-[#fff7fb] px-5 py-6">
     <div className="text-center">
        <div className="mb-2 text-2xl text-pink-400">
          ♡
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-text">
          MiiN Commission
        </h1>

        <p className="mt-1 text-sm text-text-soft">
          Tu resumen de hoy
        </p>
      </div>

    
        <Dashboard 
          sales={sales}
          onSaleAdded={(newSale) => {
            setSales((currentSales) => [...currentSales, newSale])
          }}
        />
      
    </main>
  )
} 