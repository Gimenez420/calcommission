"use client"

import { useState } from "react"
import { brands } from "@/data/brand"
import { Sale } from "@/types/sale"
import { getSales, saveSales } from "@/lib/storage"

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

  const [brandId, setBrandId] = useState(brands[0].id)
  const [amount, setAmount] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!numericAmount || numericAmount <= 0) {
      return
    }

    const newSale: Sale = {
      id: crypto.randomUUID(),
      brandId,
      amount: numericAmount,
      date,
    }

    const currentSales = getSales()

    saveSales([...currentSales, newSale])

    onSaleAdded(newSale)
    onClose()
    
    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="sale-date">Fecha</label>

        <input
          id="sale-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sale-brand">Marca</label>

        <select
          id="sale-brand"
          value={brandId}
          onChange={(event) => setBrandId(event.target.value)}
        >
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sale-amount">Importe</label>

        <input
          id="sale-amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>

      <button type="submit">
        Guardar venta
      </button>
    </form>
  )
}