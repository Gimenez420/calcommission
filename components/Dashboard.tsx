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
}

export default function Dashboard({
    sales,
    onSaleAdded
}: DashboardProps) {
    const today = new Date().toISOString().split("T")[0]
    const [isSaleFormOpen, setIsSaleFormOpen] = useState(false)
    const currentDate = new Date()

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
    <section className="space-y-4">
        <div className="rounded-3xl bg-pink-100 p-6 text-center">
            <p className="text-sm font-medium text-pink-700">
            Comisión de hoy
            </p>

            <p className="mt-2 text-4xl font-bold text-pink-900">
            {dailyCommission.toFixed(2)} €
            </p>
        </div>

        <div className="rounded-3xl bg-pink-50 p-6 text-center">
            <p className="text-sm font-medium text-pink-700">
            Comisión del mes
            </p>

            <p className="mt-2 text-4xl font-bold text-pink-900">
            {monthlyCommission.toFixed(2)} €
            </p>
        </div>

        <div className="rounded-3xl bg-pink-200 p-6 text-center">
            <p className="text-sm font-medium text-pink-700">
                Comisión <del></del> trimestre
            </p>

            <p className="mt-2 text-4xl font-bold text-pink-900">
                {quarterlyCommission.toFixed(2)}
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