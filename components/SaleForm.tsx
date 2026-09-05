"use client"

import { useState } from "react"
import { brands } from "@/data/brand"
import { Sale } from "@/types/sale"
import { getSales, saveSales } from "@/lib/storage"

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pendingSales.length === 0) {
      return;
    }

    const newSales: Sale[] = pendingSales.map((sale) => ({
      id: crypto.randomUUID(),
      brandId: sale.brandId,
      amount: Number(sale.amount),
      date,
    }));

    const currentSales = getSales();

    saveSales([...currentSales, ...newSales]);

    newSales.forEach((sale) => {
      onSaleAdded(sale);
    });

    onClose();
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
        <h3>Ventas añadidas</h3>

        <div>
          {pendingSales.map((sale, index) => {
            const brand = brands.find(
              (brand) => brand.id === sale.brandId
            )

            return (
              <div key={index}>
                <span>{brand?.name}</span>
                <span>{Number(sale.amount).toFixed(2)} €</span>
              </div>
            )
          })}
        </div>
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
      <div>
        <button
          type="button"
          onClick={handleAddSale}
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