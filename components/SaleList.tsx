"use client"

import { brands } from "@/data/brand"
import { Sale } from "@/types/sale" 
import { deleteSale } from "@/lib/storage"

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

                const handleDelete = () => {
                    const confirmed = window.confirm(
                        "¿Quieres eliminar esta venta?"
                    )

                    if (!confirmed) {
                        return
                    }

                    deleteSale(sale.id)
                }

                return (
                <div
                    key={sale.id}
                    className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-text">
                            {brand?.name}
                            </p>

                            <p className="mt-1 text-sm text-text-soft">
                            {sale.date}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="text-lg font-bold text-pink-600">
                            {sale.amount.toFixed(2)} €
                            </p>

                            <button
                            type="button"
                            onClick={handleDelete}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition active:scale-95"
                            aria-label="Eliminar venta"
                            >
                            ×
                            </button>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
            
       
    )
}