"use client"

import { useState } from "react"
import Dashboard from "@/components/Dashboard"
import { Sale } from "@/types/sale"
import { getSales } from "@/lib/storage"
import SalesList from "@/components/SaleList"
import BottomNav from "@/components/BottomNav"

export default function Home() {
  const [sales, setSales] = useState<Sale[]>(() => getSales())
  const [view, setView] = useState<"dashboard" | "sales">("dashboard")

  return (
    <main className="min-h-screen bg-[#fff7fb] px-5 pb-28 pt-6">
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

    
        {view === "dashboard" ? (
          <Dashboard
            sales={sales}
            onSaleAdded={(newSale) => {
              setSales((currentSales) => [...currentSales, newSale])
            }}
            onViewSales={() => setView("sales")}
          />
        ) : (
         <div className="mx-auto mt-6 w-full max-w-md space-y-5">


            <div className="text-center">
              <h2 className="text-2xl font-bold text-text">
                Ventas
              </h2>

              <p className="mt-1 text-sm text-text-soft">
                Historial de ventas
              </p>
            </div>

            <SalesList sales={sales} />
          </div>
        )}

        <BottomNav
          view={view}
          onChangeView={setView}
        />
    </main>
  )
} 