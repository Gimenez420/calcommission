"use client"

import { brands } from "@/data/brand"
import { 
    calculateDailyCommission, 
    calculateMonthlyCommission, 
    calculateQuarterlyCommission } from "@/lib/commissions"
import { Sale } from "@/types/sale"
import AddSaleButton from "./AddSaleButton"
import {useState} from "react"
import SaleModal from "./SaleModal"

type DashboardProps = {
    sales: Sale[]   
    onSaleAdded: (sale: Sale) => void
    onViewSales: () => void
}

export default function Dashboard({
    sales,
    onSaleAdded,
    onViewSales
}: DashboardProps) {
    const today = new Date().toISOString().split("T")[0]
    const [isSaleFormOpen, setIsSaleFormOpen] = useState(false)
    const currentDate = new Date()

    const quarterStartMonth = Math.floor(
        currentDate.getMonth() / 3
    ) * 3

    const quarterStartDate = new Date(
        currentDate.getFullYear(),
        quarterStartMonth,
    1
    )

    const quarterEndDate = new Date(
        currentDate.getFullYear(),
        quarterStartMonth + 2,
        1
    )

    const monthFormatter = new Intl.DateTimeFormat("es-ES", {
        month: "long",
    })

    const quarterLabel = `${monthFormatter.format(
        quarterStartDate
    )} — ${monthFormatter.format(quarterEndDate)}`

    const dailyCommission = calculateDailyCommission(
        sales,
        brands,
        today
    )

    const monthlyCommission = calculateMonthlyCommission(
        sales,
        brands,
        currentDate.getFullYear(),
        currentDate.getMonth()
    )

    const quarterlyCommission = calculateQuarterlyCommission(
        sales,
        brands,
        currentDate.getFullYear(),
        currentDate.getMonth()
    )

return (
    <section className="mx-auto mt-6 w-full max-w-md space-y-5">
       <div className="rounded-4xl border border-border bg-surface p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-text-soft">
                Comisión de hoy
            </p>

            <p className="mt-2 text-4xl font-bold tracking-tight text-text">
                {dailyCommission.toFixed(2)} €
            </p>
        </div>

        <div className="rounded-4xl border border-border bg-surface p-6 text-center shadow-sm">
            <p className="text-sm font-medium text-text-soft">
                Comisión del mes
            </p>

            <p className="mt-2 text-4xl font-bold tracking-tight text-text">
                {monthlyCommission.toFixed(2)} €
            </p>
        </div>

       <div className="rounded-4xl bg-pink-100 p-7 text-center shadow-sm">
            <p className="text-sm font-semibold text-pink-600">
                Comisión del trimestre
            </p>

            <p className="mt-2 text-5xl font-bold tracking-tight text-text">
                {quarterlyCommission.toFixed(2)} €
            </p>

            <p className="mt-2 text-sm text-text-soft">
                {quarterLabel}
            </p>
        </div>
        
        <AddSaleButton
            onClick={() => setIsSaleFormOpen(true)}
        />

        
        
        {isSaleFormOpen && (
            <SaleModal
                onClose ={() => setIsSaleFormOpen(false)}
                onSaleAdded={onSaleAdded}
            />
        )}
    </section>
)    
}