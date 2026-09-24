import type { Brand } from "@/types/brand"
import { createClient } from "@/lib/supabase/client"

type BrandRow = {
  id: string
  name: string
  commission: number | string
}

export async function getBrandsFromDatabase(): Promise<Brand[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("brands")
    .select("id, name, commission")
    .order("name")

  if (error) {
    throw new Error(error.message)
  }

  return (data as BrandRow[]).map((brand) => ({
    id: brand.id,
    name: brand.name,
    commission: Number(brand.commission),
  }))
}