const ICONS = {
  mail: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3.8 7.6 12 13.2l8.2-5.6" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  crm: <><circle cx="9" cy="9" r="3.2" /><path d="M3.6 19.4c0-3 2.4-5.4 5.4-5.4s5.4 2.4 5.4 5.4" /><circle cx="17.2" cy="10.4" r="2.3" /><path d="M15.4 15.2c2.7-.5 5 1.5 5 4.2" /></>,
  server: <><rect x="3" y="4" width="18" height="6.5" rx="1.6" /><rect x="3" y="13.5" width="18" height="6.5" rx="1.6" /><path d="M6.6 7.2h.01M6.6 16.8h.01" /></>,
  report: <><path d="M3 20h18" /><path d="M6.5 20v-5.5M12 20V5.5M17.5 20v-8.5" /></>,
  sensor: <><path d="M3 12.5h3.8L9.4 6l4.2 12 2.4-5.5H21" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.4" /><path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" /></>,
  agent: <><rect x="4" y="7.5" width="16" height="12" rx="3.4" /><path d="M12 7.5V4.2" /><circle cx="12" cy="3.1" r="1.3" /><path d="M9.6 13.2h.01M14.4 13.2h.01" /></>
}

const nodes = [
  { key: 'mail', icon: 'mail', title: 'E-mail a pošta', cx: 225, cy: 96, line: [287, 203, 247, 134] },
  { key: 'calendar', icon: 'calendar', title: 'Kalendář a schůzky', cx: 415, cy: 96, line: [353, 203, 393, 134] },
  { key: 'systems', icon: 'server', title: 'Interní systémy a databáze', cx: 510, cy: 260, line: [386, 260, 466, 260] },
  { key: 'sensor', icon: 'sensor', title: 'Provozní data z čidel', cx: 415, cy: 424, line: [353, 317, 393, 386] },
  { key: 'report', icon: 'report', title: 'Reporty pro vedení', cx: 225, cy: 424, line: [287, 317, 247, 386] },
  { key: 'crm', icon: 'crm', title: 'CRM a zakázky', cx: 130, cy: 260, line: [254, 260, 174, 260] }
]

function Icon({ name, cx, cy, size }) {
  const scale = size / 24
  return <g className="hd-icon" transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${scale})`}>{ICONS[name]}</g>
}

export function HeroDiagram() {
  return (
    <div className="hero-diagram">
      <svg viewBox="76 42 488 436" className="hd-svg" role="img"
        aria-label="Schéma: AI agent běžící na vašem serveru, propojený s e-mailem, kalendářem, interními systémy, provozními daty z čidel, reporty a CRM. Citlivé kroky jsou zamčené za vaším schválením.">
        <circle className="hd-pulse" cx="320" cy="260" r="72" />

        {nodes.map((node, index) => (
          <g className="hd-node" key={node.key}>
            <title>{node.title}</title>
            <line className="hd-spoke" style={{ animationDelay: `${index * -0.5}s` }}
              x1={node.line[0]} y1={node.line[1]} x2={node.line[2]} y2={node.line[3]} />
            <circle className="hd-ring" cx={node.cx} cy={node.cy} r="34" />
            <Icon name={node.icon} cx={node.cx} cy={node.cy} size={26} />
          </g>
        ))}

        <g className="hd-node hd-lock">
          <title>Citlivé kroky čekají na vaše schválení</title>
          <line className="hd-spoke" x1="320" y1="326" x2="320" y2="338" />
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
