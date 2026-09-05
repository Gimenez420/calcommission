type AddSaleButtonProps = {
    onClick: () => void
}

export default function AddSaleButton({
    onClick,
}: AddSaleButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-2xl bg-pink-500 px-6 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-pink-600"
        >
            + Añadir venta
        </button>
    )
}