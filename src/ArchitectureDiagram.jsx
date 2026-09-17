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
  model: { title: 'AI model', text: 'Zpracuje jednotlivý dotaz. Kde přesně běží, určuje zvolená úroveň výše.' },
  monitoring: { title: 'Náš monitoring', text: 'Vidíme jen to, že služba běží — ne vaše data.' }
}

function DiagramNode({ nodeKey, x, y, w, h, label, sub, primary, shape = 'rect', active, onEnter, onLeave, onClick }) {
  const cx = x + w / 2
  const cy = y + h / 2
  let shapeEl
  let textY = cy

  if (shape === 'cylinder') {
    const rx = w / 2
    const ry = 10
    shapeEl = <>
      <path d={`M ${x} ${y + ry} A ${rx} ${ry} 0 0 0 ${x + w} ${y + ry} L ${x + w} ${y + h - ry} A ${rx} ${ry} 0 0 1 ${x} ${y + h - ry} Z`} />
      <ellipse cx={cx} cy={y + ry} rx={rx} ry={ry} />
    </>
    textY = cy + ry / 2
  } else if (shape === 'monitor') {
    const screenH = h - 16
    shapeEl = <>
      <rect x={x} y={y} width={w} height={screenH} rx="4" />
      <rect x={cx - 14} y={y + screenH} width="28" height="6" />
      <rect x={cx - 26} y={y + screenH + 6} width="52" height="5" rx="1" />
    </>
    textY = y + screenH / 2
  } else if (shape === 'hex') {
    const points = [
      [x + w * 0.16, y], [x + w * 0.84, y], [x + w, cy],
      [x + w * 0.84, y + h], [x + w * 0.16, y + h], [x, cy]
    ].map((p) => p.join(',')).join(' ')
    shapeEl = <polygon points={points} />
  } else {
    shapeEl = <rect x={x} y={y} width={w} height={h} rx="2" />
  }

  return (
    <g
      className={`arch-node arch-node-${shape}${primary ? ' primary' : ''}${active === nodeKey ? ' is-active' : ''}`}
      onMouseEnter={() => onEnter(nodeKey)}
      onMouseLeave={() => onLeave(nodeKey)}
      onClick={() => onClick(nodeKey)}
    >
      {shapeEl}
      <text x={cx} y={textY - (sub ? 6 : 0)} textAnchor="middle" className="arch-label">{label}</text>
      {sub && <text x={cx} y={textY + 14} textAnchor="middle" className="arch-sublabel">{sub}</text>}
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
    { nodeKey: 'employees', x: 70, y: 70, w: 170, h: 76, label: 'Zaměstnanci a PC', sub: 'chat, e-maily', shape: 'monitor' },
    { nodeKey: 'dashboard', x: 430, y: 70, w: 170, h: 70, label: 'Dashboard', sub: 'ředitel, IT' },
    { nodeKey: 'n8n', x: 230, y: 190, w: 160, h: 90, label: 'n8n', sub: 'orchestrace', primary: true },
    { nodeKey: 'database', x: 70, y: 330, w: 170, h: 70, label: 'Databáze klienta', sub: 'jen čtení', shape: 'cylinder' },
    { nodeKey: 'model', x: 750, y: 190, w: 190, h: 90, label: 'AI model', sub: local ? 'na vašem serveru' : 'u poskytovatele', shape: 'hex' },
    { nodeKey: 'monitoring', x: 760, y: 460, w: 180, h: 60, label: 'Náš monitoring', sub: 'jen „běží / neběží“' }
  ]

  return (
    <div className="arch-diagram">
      <div className="arch-tiers">
        <button className={`arch-tier-primary${tier === 0 ? ' is-active' : ''}`} onClick={() => setTier(0)}>
          Lokální model
          <span className="arch-tier-tag">Doporučeno</span>
        </button>
        <div className="arch-tier-secondary">
          <span className="arch-tier-or">nebo</span>
          {tiers.slice(1).map((t, i) => (
            <button key={t.key} className={`arch-tier-small${tier === i + 1 ? ' is-active' : ''}`} onClick={() => setTier(i + 1)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="arch-desktop">
        <svg viewBox="0 0 1000 560" className="arch-svg" role="img" aria-label="Diagram architektury nasazení">
          <rect className="arch-perimeter" x="40" y="40" height="400" width={local ? 920 : 610} />
          <text x="60" y="28" className="arch-perimeter-label">VAŠE SÍŤ</text>

          <line x1="155" y1="146" x2="230" y2="225" className="arch-line" />
          <line x1="515" y1="140" x2="390" y2="225" className="arch-line" />
          <line x1="155" y1="330" x2="230" y2="250" className="arch-line arch-line-dashed" />
          <line x1="390" y1="235" x2="750" y2="235" className={`arch-line${local ? '' : ' arch-line-boundary'}`} />
          {!local && <text x="700" y="220" className="arch-boundary-label" textAnchor="end">jen dotaz</text>}
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
