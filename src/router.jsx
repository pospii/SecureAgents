import { useEffect, useState } from 'react'

const normalize = (path) => path || '/'
export function usePath() {
  const [path, setPath] = useState(normalize(location.pathname))
  useEffect(() => { const update = () => setPath(normalize(location.pathname)); addEventListener('popstate', update); return () => removeEventListener('popstate', update) }, [])
  return path
}
export function Link({ to, children, onClick, ...props }) {
  const navigate = (event) => { onClick?.(event); if (event.defaultPrevented || to.startsWith('#')) return; event.preventDefault(); const [path, hash] = to.split('#'); history.pushState({}, '', `${path || '/'}${hash ? `#${hash}` : ''}`); dispatchEvent(new PopStateEvent('popstate')); requestAnimationFrame(() => hash ? document.getElementById(hash)?.scrollIntoView() : window.scrollTo({ top: 0, left: 0 })) }
  return <a href={to} onClick={navigate} {...props}>{children}</a>
}
export function NavLink({ to, children }) { const path = usePath(); return <Link to={to} className={path === to ? 'active' : ''}>{children}</Link> }
