"use client"
import SaleForm from "./SaleForm"
import { Sale } from "@/types/sale"

type SaleModalProps = {
    onClose: () => void
    onSaleAdded: (sale: Sale) => void
}

export default function SaleModal({ 
    onClose,
    onSaleAdded,
}: SaleModalProps){
    return (
        <div className= "fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            <div className= "w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
               <div className= "mb-6 flex items-center justify-between">
                <h2 className= "text-2xl font-bold text-pink-900">
                    Nueva venta
                </h2>

                <button 
                    type="button"
                    onClick={onClose}
                    className="text-2x1 text-pink-400"
                    aria-label="Cerrar"
                >
                    ×
                </button>
               </div>

               <SaleForm 
                    onSaleAdded={onSaleAdded}
                    onClose={onClose}
                />
            </div>
        </div>
    )
}