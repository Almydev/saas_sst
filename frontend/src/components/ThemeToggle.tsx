import { useState } from 'react'

const KEY = 'sgsst_theme'

function inicial(): 'dark' | 'light' {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function aplicar(t: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', t)
}

aplicar(inicial())

export function ThemeToggle() {
  const [tema, setTema] = useState(inicial)

  function alternar() {
    const next = tema === 'dark' ? 'light' : 'dark'
    aplicar(next)
    setTema(next)
    try { localStorage.setItem(KEY, next) } catch { /* sin storage */ }
  }

  return (
    <button className="btn btn-ghost" type="button" onClick={alternar} aria-label="Cambiar tema">
      {tema === 'dark' ? '☀ Claro' : '☾ Oscuro'}
    </button>
  )
}
