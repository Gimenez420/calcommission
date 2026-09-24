"use client"

import {
  useEffect,
  useState,
} from "react"

import type { User } from "@supabase/supabase-js"
import AuthForm from "@/components/AuthForm"
import BottomNav from "@/components/BottomNav"
import Dashboard from "@/components/Dashboard"
import SalesList from "@/components/SaleList"
import { createClient } from "@/lib/supabase/client"
import { getSalesFromDatabase } from "@/lib/supabase/sales"
import { Sale } from "@/types/sale"


function getDisplayName(user: User | null){
  const displayName = user?.user_metadata.display_name

  if (typeof displayName === "string" && displayName.trim()){
    return displayName.trim()
  }

  return "bienvenida"
}

export default function Home() {
  const [sales, setSales] = useState<Sale[]>([])
  const [salesError, setSalesError] = useState("")
  const [view, setView] = useState<"dashboard" | "sales">("dashboard")
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  async function handleSignOut(){
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if ( error ) {
      setSalesError("No se pudo cerrar la sesion")
      return
    }

    setSales([])
  }

  useEffect(() => {
    const supabase = createClient()

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setUserName(getDisplayName(session?.user ?? null))
      setIsAuthenticated(Boolean(session))
      setIsLoadingAuth(false)
    }

    void loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserName(getDisplayName(session?.user ?? null))
      setIsAuthenticated(Boolean(session))
      setIsLoadingAuth(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    
    let isCurrent = true

    getSalesFromDatabase()
    .then((databaseSales) => {
        if (!isCurrent) {
          return
        }

      setSales(databaseSales)
      setSalesError("")
    })
    .catch(() => {
      if (isCurrent) {
          setSalesError("No se han podido cargar las ventas.")
      }
    })

  return () => {
    isCurrent = false
  }
}, [isAuthenticated])

  if (isLoadingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <p className="text-sm text-text-soft">Cargando...</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <AuthForm onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <main className="min-h-screen bg-[#fff7fb] px-5 pb-28 pt-6">
      <div className="text-center">
        <div className="mb-2 text-2xl text-pink-400">♡</div>

        <h1 className="text-3xl font-bold tracking-tight text-text">
          Hola, {userName}!
        </h1>

        
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Seguro que quieres cerrar sesión?"))
              void handleSignOut()}
            }
          className="mt-3 rounded-xl bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600"
        >
          Cerrar sesión
        </button>

        {salesError && (
          <p className="mt-1 text-sm text-pink-600">
            {salesError}
          </p>
        )}
      </div>

      {view === "dashboard" ? (
        <Dashboard sales={sales} onSaleAdded={(sale) => {
          setSales((currentSales) => [sale, ...currentSales])
        }} />

      ) : (
        <div className="mx-auto mt-6 w-full max-w-md space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text">Ventas</h2>

            <p className="mt-1 text-sm text-text-soft">
              Historial de ventas
            </p>
          </div>

          <SalesList sales={sales} />
        </div>
      )}

      <BottomNav view={view} onChangeView={setView} />
    </main>
  )
}
