const ICONS = {
  automation: <><path d="M4.2 10.2a8 8 0 0 1 13.4-3.4l2.2 2.2" /><path d="M19.8 13.8a8 8 0 0 1-13.4 3.4l-2.2-2.2" /><path d="M20 4.8V9h-4.2" /><path d="M4 19.2V15h4.2" /></>,
  server: <><rect x="3" y="4" width="18" height="6.5" rx="1.6" /><rect x="3" y="13.5" width="18" height="6.5" rx="1.6" /><path d="M6.6 7.2h.01M6.6 16.8h.01" /></>,
  computer: <><rect x="2.5" y="4.5" width="19" height="12.5" rx="2" /><path d="M12 17v3.5" /><path d="M8.8 20.5h6.4" /></>,
  office: <><path d="M3.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 13.5 5v15.5" /><path d="M13.5 9.5h5A1.5 1.5 0 0 1 20 11v9.5" /><path d="M2.5 20.5h19" /><path d="M7 7.5h.01M10.4 7.5h.01M7 11.5h.01M10.4 11.5h.01M16.6 13.5h.01" /></>,
  sensor: <><path d="M3 12.5h3.8L9.4 6l4.2 12 2.4-5.5H21" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  mail: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3.8 7.6 12 13.2l8.2-5.6" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.4" /><path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" /></>,
  agent: <><rect x="4" y="7.5" width="16" height="12" rx="3.4" /><path d="M12 7.5V4.2" /><circle cx="12" cy="3.1" r="1.3" /><path d="M9.6 13.2h.01M14.4 13.2h.01" /></>
}

// Seřazeno podle důležitosti: nahoře to, čím se firma živí, dole doplňky.
const nodes = [
  { key: 'automation', icon: 'automation', title: 'Automatizace firemních procesů', cx: 320, cy: 70, r: 40, size: 32, line: [320, 194, 320, 120] },
  { key: 'systems', icon: 'server', title: 'Napojení na interní systémy a databáze', cx: 454, cy: 126, r: 36, size: 28, line: [367, 213, 422, 158] },
  { key: 'computer', icon: 'computer', title: 'Počítače zaměstnanců', cx: 186, cy: 126, r: 36, size: 28, line: [273, 213, 218, 158] },
  { key: 'office', icon: 'office', title: 'Kanceláře a provozovny', cx: 510, cy: 260, r: 32, size: 25, line: [386, 260, 468, 260] },
  { key: 'sensor', icon: 'sensor', title: 'Provozní data z čidel', cx: 130, cy: 260, r: 32, size: 25, line: [254, 260, 172, 260] },
  { key: 'calendar', icon: 'calendar', title: 'Kalendář a schůzky', cx: 454, cy: 394, r: 28, size: 22, line: [367, 307, 428, 368] },
  { key: 'mail', icon: 'mail', title: 'E-mail a pošta', cx: 186, cy: 394, r: 28, size: 22, line: [273, 307, 212, 368] }
]

function Icon({ name, cx, cy, size }) {
  const scale = size / 24
  return <g className="hd-icon" transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${scale})`}>{ICONS[name]}</g>
}

export function HeroDiagram() {
  return (
    <div className="hero-diagram">
      <svg viewBox="82 14 476 424" className="hd-svg" role="img"
        aria-label="Schéma: AI agent běžící na vašem serveru automatizuje firemní procesy a je napojený na interní systémy, počítače zaměstnanců, kanceláře, provozní data z čidel, kalendář a e-mail. Citlivé kroky jsou zamčené za vaším schválením.">
        <circle className="hd-pulse" cx="320" cy="260" r="72" />

        {nodes.map((node, index) => (
          <g className="hd-node" key={node.key}>
            <title>{node.title}</title>
            <line className="hd-spoke" style={{ animationDelay: `${index * -0.45}s` }}
              x1={node.line[0]} y1={node.line[1]} x2={node.line[2]} y2={node.line[3]} />
            <circle className="hd-ring" cx={node.cx} cy={node.cy} r={node.r} />
            <Icon name={node.icon} cx={node.cx} cy={node.cy} size={node.size} />
          </g>
        ))}

        <g className="hd-node hd-lock">
          <title>Citlivé kroky čekají na vaše schválení</title>
          <line className="hd-spoke" x1="320" y1="326" x2="320" y2="336" />
          <circle className="hd-ring" cx="320" cy="372" r="26" />
          <Icon name="lock" cx={320} cy={372} size={22} />
        </g>

        <g className="hd-node hd-hub">
          <title>AI agent běží na vašem serveru</title>
          <circle className="hd-ring" cx="320" cy="260" r="56" />
          <Icon name="agent" cx={320} cy={260} size={44} />
        </g>
      </svg>
    </div>
  )
}
