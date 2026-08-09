import { Link, NavLink } from './router'

export function StatusBar() {
  return <div className="statusbar"><div className="wrap"><div><span className="dot" /><span className="mono">SYSTÉM: PŘIPRAVEN K NASAZENÍ</span></div><div className="statusbar-right mono"><span>ŠIFROVÁNO</span><span>SELF-HOSTED</span><span>OSTRAVA / BRNO</span></div></div></div>
}

export function Header() {
  return <header className="site"><div className="wrap"><Link className="logo" to="/">Secure<span>Agents</span></Link><nav className="site"><NavLink to="/#sluzby">Služby</NavLink><NavLink to="/jak-to-funguje">Jak to funguje</NavLink><NavLink to="/#proc">Proč my</NavLink><NavLink to="/#kontakt">Kontakt</NavLink></nav></div></header>
}

export function Panel({ children, className = '' }) {
  return <div className={`panel ${className}`}><i className="tl" /><i className="tr" />{children}<i className="bl" /><i className="br" /></div>
}

export function Button({ children, to, primary = false }) {
  const className = `btn${primary ? ' btn-primary' : ''}`
  return to.startsWith('mailto:') ? <a className={className} href={to}>{children}</a> : <Link className={className} to={to}>{children}</Link>
}

export function Footer({ technical = false }) {
  return <footer id="kontakt"><div className="wrap"><div><h3>{technical ? 'Máte technickou otázku, na kterou tu nevidíte odpověď?' : 'Chcete AI agenta, kterému rozumíte a věříte?'}</h3><div className="cta-row"><Button to="mailto:info@secureagents.cz" primary>info@secureagents.cz</Button>{technical && <Button to="/#sluzby">Zpět na služby</Button>}</div></div><div className="foot-meta"><div>SecureAgents</div><div>Ostrava / Brno, ČR</div><div>© 2026</div></div></div></footer>
}
