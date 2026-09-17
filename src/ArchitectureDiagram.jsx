import { useState } from 'react'

const tiers = [
  { key: 'local', label: 'Lokální model', desc: 'Model běží přímo na vašem serveru. Nic — ani jednotlivý dotaz — neopouští vaši síť.' },
  { key: 'eu', label: 'Evropský poskytovatel', desc: 'Model běží u poskytovatele v EU. Ven jde jen jednotlivý dotaz, bez trvalého uložení.' },
  { key: 'global', label: 'Globální s nulovou retencí', desc: 'Nejvyšší kvalita modelu. Ven jde jen jednotlivý dotaz, poskytovatel ho neukládá.' }
]

const nodeInfo = {
  employees: { title: 'Zaměstnanci a PC', text: 'Přístup k AI přes self-hosted chat portál — psaní, shrnutí, překlady, bez závislosti na cizí webové appce.' },
  n8n: { title: 'n8n', text: 'Jedna platforma pro automatizaci procesů, monitoring i chat s asistentem.' },
  database: { title: 'Databáze klienta', text: 'Napojení jen pro čtení — agent do vašich provozních dat nikdy nezapisuje.' },
  dashboard: { title: 'Dashboard', text: 'Přehled stavu, anomálií a nákladů pro vedení a IT.' },
  model: { title: 'AI model', text: 'Zpracuje jednotlivý dotaz. Kde přesně běží, určuje zvolená úroveň níže.' },
  monitoring: { title: 'Náš monitoring', text: 'Vidíme jen to, že služba běží — ne vaše data.' }
}

function DiagramNode({ nodeKey, x, y, w, h, label, sub, primary, active, onEnter, onLeave, onClick }) {
  return (
    <g
      className={`arch-node${primary ? ' primary' : ''}${active === nodeKey ? ' is-active' : ''}`}
      onMouseEnter={() => onEnter(nodeKey)}
      onMouseLeave={() => onLeave(nodeKey)}
      onClick={() => onClick(nodeKey)}
    >
      <rect x={x} y={y} width={w} height={h} rx="2" />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 6 : 0)} textAnchor="middle" className="arch-label">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="arch-sublabel">{sub}</text>}
    </g>
  )
}

export function ArchitectureDiagram() {
  const [tier, setTier] = useState(0)
  const [active, setActive] = useState(null)
  const local = tier === 0
  const info = active ? nodeInfo[active] : null
  const enter = (key) => setActive(key)
  const leave = (key) => setActive((current) => (current === key ? null : current))
  const click = (key) => setActive((current) => (current === key ? null : key))

  const nodes = [
    { nodeKey: 'employees', x: 70, y: 70, w: 170, h: 70, label: 'Zaměstnanci a PC', sub: 'chat, e-maily' },
    { nodeKey: 'dashboard', x: 430, y: 70, w: 170, h: 70, label: 'Dashboard', sub: 'ředitel, IT' },
    { nodeKey: 'n8n', x: 230, y: 190, w: 160, h: 90, label: 'n8n', sub: 'orchestrace', primary: true },
    { nodeKey: 'database', x: 70, y: 330, w: 170, h: 70, label: 'Databáze klienta', sub: 'jen čtení' },
    { nodeKey: 'model', x: 760, y: 195, w: 180, h: 80, label: 'AI model', sub: local ? 'na vašem serveru' : 'u poskytovatele' },
    { nodeKey: 'monitoring', x: 760, y: 460, w: 180, h: 60, label: 'Náš monitoring', sub: 'jen „běží / neběží“' }
  ]

  return (
    <div className="arch-diagram">
      <div className="arch-tiers">
        {tiers.map((t, index) => (
          <button key={t.key} className={`arch-tier-btn${tier === index ? ' is-active' : ''}`} onClick={() => setTier(index)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="arch-desktop">
        <svg viewBox="0 0 1000 560" className="arch-svg" role="img" aria-label="Diagram architektury nasazení">
          <rect className="arch-perimeter" x="40" y="40" height="400" width={local ? 920 : 620} />
          <text x="60" y="28" className="arch-perimeter-label">VAŠE SÍŤ</text>

          <line x1="155" y1="140" x2="230" y2="225" className="arch-line" />
          <line x1="515" y1="140" x2="390" y2="225" className="arch-line" />
          <line x1="155" y1="330" x2="230" y2="250" className="arch-line arch-line-dashed" />
          <line x1="390" y1="235" x2="760" y2="235" className={`arch-line${local ? '' : ' arch-line-boundary'}`} />
          {!local && <text x="710" y="220" className="arch-boundary-label" textAnchor="end">jen dotaz</text>}
          <path d="M 310 280 L 310 440 L 850 440 L 850 460" className="arch-line arch-line-pulse" />

          {nodes.map((n) => <DiagramNode key={n.nodeKey} {...n} active={active} onEnter={enter} onLeave={leave} onClick={click} />)}
        </svg>
      </div>

      <div className="arch-mobile cost-flow">
        <div className="cost-row"><div className="marker">01</div><div><h4>Zaměstnanci a PC</h4><p>Přístup k AI přes self-hosted chat portál.</p></div></div>
        <div className="cost-row"><div className="marker">02</div><div><h4>n8n</h4><p>Jedna platforma — automatizace, monitoring i chat s asistentem.</p></div></div>
        <div className="cost-row"><div className="marker">03</div><div><h4>Databáze klienta</h4><p>Napojení jen pro čtení.</p></div></div>
        <div className="cost-row"><div className="marker">04</div><div><h4>Dashboard</h4><p>Přehled stavu a nákladů pro vedení a IT.</p></div></div>
        <div className="cost-row"><div className="marker">05</div><div><h4>AI model</h4><p>{local ? 'Běží na vašem serveru — nic neopouští vaši síť.' : 'Běží u poskytovatele — ven jde jen jednotlivý dotaz.'}</p></div></div>
        <div className="cost-row"><div className="marker">06</div><div><h4>Náš monitoring</h4><p>Vidíme jen to, že služba běží — ne vaše data.</p></div></div>
      </div>

      <p className="arch-caption">
        {info ? <><b>{info.title}.</b> {info.text}</> : <><b>{tiers[tier].label}.</b> {tiers[tier].desc}</>}
      </p>
    </div>
  )
}
