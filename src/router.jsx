import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const normalize = (path) => path || '/'
export function usePath() {
  const [path, setPath] = useState(normalize(location.pathname))
  useEffect(() => { const update = () => setPath(normalize(location.pathname)); addEventListener('popstate', update); return () => removeEventListener('popstate', update) }, [])
  return path
}
export function Link({ to, children, onClick, ...props }) {
  const navigate = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || to.startsWith('#')) return
    event.preventDefault()
    const [rawPath, hash] = to.split('#')
    const path = rawPath || '/'
    const samePage = path === normalize(location.pathname)
    const apply = (sync) => { history.pushState({}, '', `${path}${hash ? `#${hash}` : ''}`); const fire = () => dispatchEvent(new PopStateEvent('popstate')); if (sync) flushSync(fire); else fire() }
    const scroll = (behavior) => hash ? document.getElementById(hash)?.scrollIntoView({ behavior }) : window.scrollTo({ top: 0, left: 0, behavior })
    // Mezi stránkami krátké prolnutí (View Transitions); v rámci stránky jen plynulý posun.
    if (!samePage && document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(() => { apply(true); scroll('instant') })
    else { apply(false); requestAnimationFrame(() => scroll(samePage ? 'smooth' : 'instant')) }
  }
  return <a href={to} onClick={navigate} {...props}>{children}</a>
}
export function NavLink({ to, children, onClick }) { const path = usePath(); return <Link to={to} className={path === to ? 'active' : ''} onClick={onClick}>{children}</Link> }
