import { useState } from 'react'

const hub = { key: 'hub', title: 'AI Agent', text: 'Běží na vašem serveru. Data, historie konverzací i oprávnění zůstávají u vás — ven jde jen jednotlivý dotaz na model.' }
const approval = { key: 'approval', title: 'Vaše schválení', text: 'Než agent udělá něco citlivého — odešle zprávu, změní záznam nebo sáhne na peníze — čeká na vaše potvrzení.' }

const uses = [
  { key: 'email', label: 'E-mail a pošta', x: 30, y: 40, line: [258, 216, 176, 84], text: 'Vytřídí příchozí poštu, vytáhne z ní úkoly a připraví návrhy odpovědí k vašemu schválení.' },
  { key: 'kalendar', label: 'Kalendář', x: 430, y: 40, line: [382, 216, 464, 84], text: 'Hlídá termíny, připraví podklady na schůzku a pohlídá, co z ní vzešlo.' },
  { key: 'crm', label: 'CRM a zakázky', x: 10, y: 237, line: [218, 260, 192, 260], text: 'Přenáší údaje mezi systémy, místo aby je někdo přepisoval ručně z jednoho do druhého.' },
  { key: 'systemy', label: 'Interní systémy', x: 450, y: 237, line: [422, 260, 448, 260], text: 'Čte jen to, k čemu dostal oprávnění. Do provozních dat nezapisuje.' },
  { key: 'reporty', label: 'Reporty', x: 30, y: 434, line: [258, 304, 176, 436], text: 'Posbírá data z více nástrojů do jednoho pravidelného přehledu, místo ručního dohledávání.' },
  { key: 'provoz', label: 'Data z čidel', x: 430, y: 434, line: [382, 304, 464, 436], text: 'Sleduje naměřené hodnoty, pozná odchylku od běžného stavu a upozorní odpovědného člověka.' }
]

function Node({ item, x, y, w, h, className, children, active, on }) {
  return (
    <g
      className={`hd-node ${className}${active === item.key ? ' is-active' : ''}`}
      tabIndex={0}
      role="button"
      aria-label={item.title || item.label}
      onMouseEnter={() => on.enter(item.key)}
      onMouseLeave={() => on.leave(item.key)}
      onFocus={() => on.enter(item.key)}
      onBlur={() => on.leave(item.key)}
      onClick={() => on.click(item.key)}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); on.click(item.key) } }}
    >
      <rect x={x} y={y} width={w} height={h} rx="12" />
      {children}
    </g>
  )
}

export function HeroDiagram() {
  const [active, setActive] = useState(null)
  const on = {
    enter: (key) => setActive(key),
    leave: (key) => setActive((current) => (current === key ? null : current)),
    click: (key) => setActive((current) => (current === key ? null : key))
  }
  const info = active === 'hub' ? hub : active === 'approval' ? approval : uses.find((u) => u.key === active)

  return (
    <div className="hero-diagram">
      <svg viewBox="0 0 640 520" className="hd-svg" role="img" aria-label="Schéma: AI agent uprostřed a případy jeho využití ve firmě kolem něj">
        {uses.map((u, index) => (
          <line key={u.key} className={`hd-line${active === u.key ? ' is-active' : ''}`}
            style={{ animationDelay: `${index * -0.5}s` }}
            x1={u.line[0]} y1={u.line[1]} x2={u.line[2]} y2={u.line[3]} />
        ))}
        <line className={`hd-line hd-line-approval${active === 'approval' ? ' is-active' : ''}`} x1="320" y1="308" x2="320" y2="350" />

        <rect className="hd-pulse" x="206" y="198" width="228" height="124" rx="18" />

        <Node item={hub} x={220} y={212} w={200} h={96} className="hd-hub" active={active} on={on}>
          <text x="320" y="254" textAnchor="middle" className="hd-label">AI Agent</text>
          <text x="320" y="274" textAnchor="middle" className="hd-sub">na vašem serveru</text>
        </Node>

        <Node item={approval} x={240} y={352} w={160} h={44} className="hd-approval" active={active} on={on}>
          <text x="320" y="379" textAnchor="middle" className="hd-label hd-label-sm">Vaše schválení</text>
        </Node>

        {uses.map((u) => (
          <Node key={u.key} item={u} x={u.x} y={u.y} w={180} h={46} className="hd-use" active={active} on={on}>
            <text x={u.x + 90} y={u.y + 28} textAnchor="middle" className="hd-label hd-label-sm">{u.label}</text>
          </Node>
        ))}
      </svg>

      <ul className="hd-list">
        {uses.map((u) => <li key={u.key}>{u.label}</li>)}
        <li className="hd-list-approval">{approval.title} u citlivých kroků</li>
      </ul>

      <p className="hd-caption">
        {info
          ? <><b>{info.title || info.label}.</b> {info.text}</>
          : <>Agent uprostřed, vaše nástroje kolem něj. <b>Najeďte na kterýkoliv z nich</b> a uvidíte, co pro vás převezme.</>}
      </p>
    </div>
  )
}
