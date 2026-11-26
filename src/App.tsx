import { useEffect, useState } from "react"

type Container = { Id: string; Names: string[]; Image: string; State: string; Status: string }

export default function App() {
  const [items, setItems] = useState<Container[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/containers")
      .then(async r => {
        if (!r.ok) {
          const message = (await r.text()).trim()
          throw new Error(message || `Backend request failed (${r.status}). Check that the Cozy server is running on port 8080.`)
        }
        return r.json()
      })
      .then(setItems)
      .catch(e => setError(String(e)))
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">cozy</h1>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-2">
        {items.map(c => (
          <li key={c.Id} className="rounded-lg border p-3">
            <b>{c.Names[0]?.replace("/", "")}</b> · {c.Image} · {c.Status}
          </li>
        ))}
      </ul>
    </main>
  )
}
