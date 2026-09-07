import { Brand } from "@/types/brand"
import { Sale } from "@/types/sale"

function parseSaleDate(date: string) {
  const [year, month, day] = date.split("-").map(Number)

  return new Date(year, month - 1, day)
}

export function calculateCommission(
    amount: number,
    brand: Brand
): number {
    
    const amountWithoutVat = amount / 1.21

const commission =
  amountWithoutVat * (brand.commission / 100)

    return Number(commission.toFixed(2))
}

export function calculateTotalCommission(
    sales: Sale[],
    brands: Brand[]
): number {
    const total = sales.reduce((sum, sale) => {
        const brand = brands.find(
            (brand) => brand.id === sale.brandId
        )

        if (!brand) {
            return sum
        }

        return sum + calculateCommission(sale.amount, brand)
    }, 0)

    return Number(total.toFixed(2))
}

export function calculateDailyCommission(
    sales: Sale[],
    brands: Brand[],
    date: string
): number {
    const dailySales = sales.filter((sale) => sale.date === date)

    return calculateTotalCommission(dailySales, brands)
}

export function calculateMonthlyCommission(
    sales: Sale[],
    brands: Brand[],
    year: number,
    month: number
): number {
    const monthlySales = sales.filter((sale) => {
        const saleDate = parseSaleDate(sale.date)

        return (
            saleDate.getFullYear() === year &&
            saleDate.getMonth() === month
        )
    })
    return calculateTotalCommission(monthlySales, brands)
}

export function calculateQuarterlyCommission(
  sales: Sale[],
  brands: Brand[],
  year: number,
  month: number
): number {
  const quarterStartMonth = Math.floor(month / 3) * 3;

  const start = new Date(year, quarterStartMonth, 1);
  const end = new Date(year, quarterStartMonth + 3, 1);

  const quarterlySales = sales.filter((sale) => {
    const saleDate = parseSaleDate(sale.date)

    return saleDate >= start && saleDate < end;
  });

  return calculateTotalCommission(quarterlySales, brands);
}
