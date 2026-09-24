"use client"

import { useState } from "react"
import { brands } from "@/data/brand"
import { Sale } from "@/types/sale"
import { addSalesToDatabase } from "@/lib/supabase/sales"

type PendingSale = {
  brandId: string
  amount: string
}

type SaleFormProps = {
  onSaleAdded: (sale: Sale) => void
  onClose: () => void
}

export default function SaleForm({
  onSaleAdded,
  onClose,
}: SaleFormProps) {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  )

  const [pendingSales, setPendingSales] = useState<PendingSale[]>([])

  const [brandId, setBrandId] = useState(brands[0].id)
  const [amount, setAmount] = useState("")

  function handleAddSale() {
    if (!amount || Number(amount) <= 0) {
      return
    }

    setPendingSales((currentSales) => [
      ...currentSales,
      {
        brandId,
        amount
      }
    ])

    setAmount("")
  }

  function handleDeleteSale(index: number) {
    const confirmed = window.confirm(
      "¿Quieres eliminar esta venta?"
    )

    if (!confirmed) {
      return
    }

    setPendingSales((currentSales) =>
      currentSales.filter((_, saleIndex) => saleIndex !== index)
    )
  }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (pendingSales.length === 0) {
      return
    }

    const confirmed = window.confirm(
      `¿Quieres guardar las ${pendingSales.length} ventas?`
    )

    if (!confirmed) {
      return
    }

    const newSales = pendingSales.map((sale) => ({
      brandId: sale.brandId,
      amount: Number(sale.amount),
      date,
    }))

    try {
      const savedSales = await addSalesToDatabase(newSales)

      savedSales.forEach((sale) => {
        onSaleAdded(sale)
      })

      onClose()
    } catch (error) {
      window.alert(
        error instanceof Error
          ? `No se pudieron guardar las ventas: ${error.message}`
          : "No se pudieron guardar las ventas."
      )
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="space-y-2">
        <label 
          htmlFor="sale-date"
          className="text-sm font-medium text-text-soft"
        >
          Fecha
        </label>

        <input
          id="sale-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-2xl border border-border bg-pink-50 px-4 py-3 text-text outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div>

        <div>
         {pendingSales.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-text">
                Ventas añadidas
              </h3>

              <div className="overflow-hidden rounded-2xl border border-border bg-pink-50">
                {pendingSales.map((sale, index) => {
                  const brand = brands.find(
                    (brand) => brand.id === sale.brandId
                  )

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-border px-4 py-3 last:border-b-0"
                    >
                      <span className="font-medium text-text">
                        {brand?.name}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-pink-600">
                          {Number(sale.amount).toFixed(2)} €
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDeleteSale(index)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-600 transition active:scale-95"
                          aria-label="Eliminar venta"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label 
        htmlFor="sale-brand"
        className="text-sm font-medium text-text-soft"
        >
          Marca
        </label>

        <select
          id="sale-brand"
          value={brandId}
          onChange={(event) => setBrandId(event.target.value)}
          className="w-full rounded-2xl border border-border bg-pink-50 px-4 py-3 text-text outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        >
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="sale-amount"
          className="text-sm font-medium text-text-soft"
        >
          Importe
        </label>

        <input
          id="sale-amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0,00 €"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full rounded-2xl border border-border bg-pink-50 px-4 py-3 text-text outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
        />
      </div>
      <div>
        <button
          type="button"
          onClick={handleAddSale}
          className="w-full rounded-2xl border border-pink-300 bg-pink-50 px-5 py-3 font-semibold text-pink-600 transition active:scale-[0.98] hover:bg-pink-100"
        >
          + Añadir venta
        </button>
      </div>

      <button type="submit">
        Guardar ticket
      </button>
    </form>
  )
}