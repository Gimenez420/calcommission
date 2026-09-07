"use client"

import { brands } from "@/data/brand"
import { Sale } from "@/types/sale" 

type SalesListProps = {
    sales: Sale[]
}

export default function SalesList({sales}: SalesListProps) {
    const sortedSales = [...sales].sort(
        (a, b) => b.date.localeCompare(a.date)
    )

    return (
        <div className="space-y-3">
            {sortedSales.map((sale) => {
                const brand = brands.find(
                    (brand) => brand.id === sale.brandId
                )

                return (
                <div
                    key={sale.id}
                    className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-text">
                        {brand?.name}
                        </p>

                        <p className="mt-1 text-sm text-text-soft">
                        {sale.date}
                        </p>
                    </div>

                    <p className="text-lg font-bold text-pink-600">
                        {sale.amount.toFixed(2)} €
                    </p>
                    </div>
                </div>
                )
            })}
        </div>
            
       
    )
}