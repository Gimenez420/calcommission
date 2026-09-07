"use client"

type BottomNavProps = {
  view: "dashboard" | "sales"
  onChangeView: (view: "dashboard" | "sales") => void
}

export default function BottomNav({
  view,
  onChangeView
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 px-4 pb-[env(safe-area-inset-bottom)] pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-md justify-around">
        <button
          type="button"
          onClick={() => onChangeView("dashboard")}
          className={`flex flex-col items-center gap-1 px-6 py-2 text-sm font-medium transition ${
            view === "dashboard"
              ? "text-pink-600"
              : "text-text-soft"
          }`}
        >
          <span className="text-xl">⌂</span>
          <span>Inicio</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeView("sales")}
          className={`flex flex-col items-center gap-1 px-6 py-2 text-sm font-medium transition ${
            view === "sales"
              ? "text-pink-600"
              : "text-text-soft"
          }`}
        >
          <span className="text-xl">▤</span>
          <span>Ventas</span>
        </button>
      </div>
    </nav>
  )
}