import { Brand } from "@/types/brand";
import { Sale } from "@/types/sale";

export function calculateCommission(
    amount: number,
    brand: Brand
): number {
    const commission = amount * (brand.commission / 100);

    return Number(commission.toFixed(2));
}

export function calculateTotalCommission(
    sales: Sale[],
    brands: Brand[]
): number {
    const total = sales.reduce((sum, sale) => {
        const brand = brands.find(
            (brand) => brand.id === sale.brandId
        );

        if (!brand) {
            return sum;
        }

        return sum + calculateCommission(sale.amount, brand);
    }, 0);

    return Number(total.toFixed(2));
}