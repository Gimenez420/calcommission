import { Sale } from "@/types/sale"

const SALES_STORAGE_KEY = "miin-sales"

export function getSales(): Sale[] {
    const storedSales = localStorage.getItem(SALES_STORAGE_KEY)

    if (!storedSales){
        return []
    }
    
    return JSON.parse(storedSales)
}

export function saveSales(sales: Sale[]): void {
    localStorage.setItem(
        SALES_STORAGE_KEY,
        JSON.stringify(sales)
    )
}