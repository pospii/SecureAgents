import { Link, NavLink } from './router'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics/react'

export function StatusBar() {
  return <div className="statusbar"><div className="wrap"><div><span className="dot" /><span className="mono">SYSTÉM: PŘIPRAVEN K NASAZENÍ</span></div><div className="statusbar-right mono"><span>ŠIFROVÁNO</span><span>SELF-HOSTED</span><span>OSTRAVA / BRNO</span></div></div></div>
}

export function Header() {
  return <header className="site"><div className="wrap"><Link className="logo" to="/">Secure<span>Agents</span></Link><nav className="site"><NavLink to="/#sluzby">Služby</NavLink><NavLink to="/jak-to-funguje">Jak to funguje</NavLink><NavLink to="/o-nas">O nás</NavLink><NavLink to="/faq">FAQ</NavLink><NavLink to="/#kontakt">Kontakt</NavLink></nav></div></header>
}

export function Panel({ children, className = '' }) {
  return <div className={`panel ${className}`}><i className="tl" /><i className="tr" />{children}<i className="bl" /><i className="br" /></div>
}

export function Button({ children, to, primary = false, eventName, ...props }) {
  const className = `btn${primary ? ' btn-primary' : ''}`
  const onClick = (event) => { if (eventName && localStorage.getItem('secureagents_cookie_consent') === 'accepted') track(eventName); props.onClick?.(event) }
  return to.startsWith('mailto:') ? <a className={className} href={to} onClick={onClick} {...props}>{children}</a> : <Link className={className} to={to} onClick={onClick} {...props}>{children}</Link>
}

export function Footer({ technical = false, onOpenCookies }) {
  return <footer><div className="wrap"><div><h3>{technical ? 'Máte technickou otázku, na kterou tu nevidíte odpověď?' : 'Chcete AI agenta, kterému rozumíte a věříte?'}</h3><div className="cta-row"><Button to="mailto:info@secureagents.cz" primary eventName="Kontaktovat e-mailem">info@secureagents.cz</Button>{technical && <Button to="/#sluzby">Zpět na služby</Button>}</div></div><div className="foot-meta"><div>SecureAgents</div><div>Ostrava / Brno, ČR</div><div><Link to="/blog">Blog</Link></div><div><Link to="/ochrana-soukromi">Ochrana soukromí</Link></div><div><button className="text-button" onClick={onOpenCookies}>Nastavení cookies</button></div><div>© 2026</div></div></div></footer>
}

export function CookieBanner({ onSave }) {
  const [details, setDetails] = useState(false)
  return <aside className="cookie-banner" aria-label="Nastavení cookies" role="dialog"><div className="cookie-copy"><p className="mono">SOUKROMÍ A COOKIES</p><h2>Máte kontrolu nad analytikou.</h2><p>Nezbytně ukládáme jen vaši volbu. S vaším souhlasem zapneme Vercel Analytics a Speed Insights pro anonymizované měření návštěvnosti a výkonu.</p>{details && <p className="cookie-details"><b>Analytické:</b> Vercel Analytics a Speed Insights. Můžete je kdykoli vypnout v nastavení cookies.</p>}<button className="text-button" onClick={() => setDetails((value) => !value)} aria-expanded={details}>{details ? 'Skrýt podrobnosti' : 'Zobrazit podrobnosti'}</button></div><div className="cookie-actions"><button className="btn" onClick={() => onSave('rejected')}>Jen nezbytné</button><button className="btn btn-primary" onClick={() => onSave('accepted')}>Povolit analytiku</button><Link className="text-link" to="/ochrana-soukromi">Zásady ochrany soukromí</Link></div></aside>
}

function useScrolledPast(threshold) {
  const [past, setPast] = useState(false)
  useEffect(() => { const update = () => setPast(window.scrollY > threshold); update(); addEventListener('scroll', update, { passive: true }); return () => removeEventListener('scroll', update) }, [threshold])
  return past
}

export function ScrollToTop({ hidden = false }) {
  const scrolled = useScrolledPast(420)
  return <button className={`scroll-top${scrolled && !hidden ? ' is-visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Přejít na začátek stránky" title="Nahoru">↑<span>Nahoru</span></button>
}

export function FloatingConsult({ hidden = false }) {
  const visible = useScrolledPast(420)
  const onClick = () => { if (localStorage.getItem('secureagents_cookie_consent') === 'accepted') track('Klik na plovoucí CTA') }
  return <Link to="/#kontakt" className={`consult-cta${visible && !hidden ? ' is-visible' : ''}`} onClick={onClick}><span className="dot" />Domluvit konzultaci</Link>
}

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', interest: '', message: '' })
  const [status, setStatus] = useState('idle')
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const openMailClient = () => { const body = [`Jméno: ${form.name}`, `E-mail: ${form.email}`, `Firma: ${form.company}`, `Zájem: ${form.interest}`, '', form.message].join('\n'); window.location.href = `mailto:info@secureagents.cz?subject=${encodeURIComponent('Poptávka z webu SecureAgents')}&body=${encodeURIComponent(body)}` }
  const submit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    if (localStorage.getItem('secureagents_cookie_consent') === 'accepted') track('Odeslat poptávku', { interest: form.interest })
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error('send-failed')
      setStatus('sent')
      setForm({ name: '', email: '', company: '', interest: '', message: '' })
    } catch {
      setStatus('error')
      openMailClient()
    }
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-grid"><label>Jméno<input required name="name" value={form.name} onChange={update} autoComplete="name" /></label><label>E-mail<input required type="email" name="email" value={form.email} onChange={update} autoComplete="email" /></label><label>Firma<input required name="company" value={form.company} onChange={update} autoComplete="organization" /></label><label>Co vás zajímá?<select required name="interest" value={form.interest} onChange={update}><option value="">Vyberte možnost</option><option>Audit a návrh nasazení</option><option>Nasazení AI agenta</option><option>Správa a rozvoj</option><option>Bezpečnostní audit</option><option>Jiné</option></select></label></div><label>Co chcete automatizovat?<textarea required name="message" value={form.message} onChange={update} placeholder="Například e-maily, pravidelné přehledy nebo propojení s CRM…" rows="5" /></label><button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Odesílám…' : 'Odeslat poptávku'}</button>{status === 'sent' && <p className="form-message" role="status">Díky! Poptávku jsme přijali a brzy se ozveme.</p>}{status === 'error' && <p className="form-message" role="status">Nepodařilo se to odeslat rovnou, otevíráme váš e-mailový klient s předvyplněnou zprávou.</p>}<p className="form-note">Odesláním poptávky nám pošlete uvedené údaje na info@secureagents.cz.</p></form>
}
