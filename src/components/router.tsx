import { createContext, useCallback, useContext, useEffect, useState, type ComponentProps } from 'react'

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/'

const Ctx = createContext<{ path: string; go: (to: string) => void }>({ path: '/', go: () => {} })

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(() => norm(location.pathname))
  useEffect(() => {
    const onPop = () => setPath(norm(location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const go = useCallback((to: string) => {
    const [p, hash] = to.split('#')
    history.pushState(null, '', to)
    setPath(norm(p))
    requestAnimationFrame(() => {
      const el = hash ? document.getElementById(hash) : null
      if (el) el.scrollIntoView()
      else window.scrollTo(0, 0)
    })
  }, [])
  return <Ctx.Provider value={{ path, go }}>{children}</Ctx.Provider>
}

export const useRoute = () => useContext(Ctx)

export function Link({ to, onClick, ...rest }: { to: string } & ComponentProps<'a'>) {
  const { go } = useRoute()
  return (
    <a
      {...rest}
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        go(to)
      }}
    />
  )
}
