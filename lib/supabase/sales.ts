import { Sale } from "@/types/sale"
import { createClient } from "@/lib/supabase/client"

export type NewSale = Omit<Sale, "id">

type SaleRow = {
  id: string
  brand_id: string
  amount: number | string
  sale_date: string
}

function toSale(row: SaleRow): Sale {
  return {
    id: row.id,
    brandId: row.brand_id,
    amount: Number(row.amount),
    date: row.sale_date,
  }
}

export async function getSalesFromDatabase(): Promise<Sale[]> {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Debes iniciar sesión para cargar las ventas.")
  }

  const { data, error } = await supabase
    .from("sales")
    .select("id, brand_id, amount, sale_date")
    .eq("owner_id", user.id)
    .order("sale_date", { ascending: false })
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data as SaleRow[]).map(toSale)
}

export async function addSalesToDatabase(
  sales: NewSale[]
): Promise<Sale[]> {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Debes iniciar sesión para guardar una venta.")
  }

  const { data, error } = await supabase
    .from("sales")
    .insert(
      sales.map((sale) => ({
        owner_id: user.id,
        created_by: user.id,
        brand_id: sale.brandId,
        amount: sale.amount,
        sale_date: sale.date,
      }))
    )
    .select("id, brand_id, amount, sale_date")

  if (error) {
    throw new Error(error.message)
  }

  return (data as SaleRow[]).map(toSale)
}

export async function deleteSaleFromDatabase(saleId: string): Promise<void> {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Debes iniciar sesión para eliminar una venta.")
  }

  const { error } = await supabase
    .from("sales")
    .delete()
    .eq("id", saleId)
    .eq("owner_id", user.id)

  if (error) {
    throw new Error(error.message)
  }
}
