import { Sale } from "@/types/sale"

const SALES_STORAGE_KEY = "miin-sales"

const EMPTY_SALES: Sale[] = []

let cachedSales: Sale[] = []
let cachedStorageValue: string | null = null

const listeners = new Set<() => void>()

export function getSales(): Sale[] {
  if (typeof window === "undefined") {
    return []
  }

  const storedSales = localStorage.getItem(SALES_STORAGE_KEY)

  if (!storedSales) {
    return []
  }

  return JSON.parse(storedSales)
}

export function getSalesSnapshot(): Sale[] {
  if (typeof window === "undefined") {
    return EMPTY_SALES
  }

  const storedSales = localStorage.getItem(SALES_STORAGE_KEY)

  if (storedSales === cachedStorageValue) {
    return cachedSales
  }

  cachedStorageValue = storedSales
  cachedSales = storedSales
    ? JSON.parse(storedSales)
    : []

  return cachedSales
}

export function subscribeToSales(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function saveSales(sales: Sale[]): void {
  const storageValue = JSON.stringify(sales)

  localStorage.setItem(
    SALES_STORAGE_KEY,
    storageValue
  )

  cachedStorageValue = storageValue
  cachedSales = sales

  listeners.forEach((listener) => listener())
}

export function deleteSale(saleId: string): void {
  const currentSales = getSalesSnapshot()

  const updatedSales = currentSales.filter(
    (sale) => sale.id !== saleId
  )

  saveSales(updatedSales)
}