"use client"

import SaleForm from "./SaleForm"
import type { Brand } from "@/types/brand"
import type { Sale } from "@/types/sale"

type SaleModalProps = {
  brands: Brand[]
  onClose: () => void
  onSaleAdded: (sale: Sale) => void
}

export default function SaleModal({
  brands,
  onClose,
  onSaleAdded,
}: SaleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-text/20 p-0 sm:items-center sm:p-4">
      <div className="w-full max-w-md rounded-t-4xl bg-surface p-6 shadow-xl sm:rounded-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-text">
            Nueva venta
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-xl text-pink-600 transition active:scale-95"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <SaleForm
          brands={brands}
          onSaleAdded={onSaleAdded}
          onClose={onClose}
        />
      </div>
    </div>
  )
}
