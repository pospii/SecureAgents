const REQUIRED_FIELDS = ['name', 'email', 'company', 'interest', 'message']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'method-not-allowed' }); return }

  const body = req.body || {}
  const missing = REQUIRED_FIELDS.filter((field) => !String(body[field] || '').trim())
  if (missing.length || !EMAIL_RE.test(body.email)) { res.status(400).json({ error: 'invalid-input' }); return }

  if (!process.env.RESEND_API_KEY) { res.status(500).json({ error: 'not-configured' }); return }

  const text = [
    `Jméno: ${body.name}`,
    `E-mail: ${body.email}`,
    `Firma: ${body.company}`,
    `Zájem: ${body.interest}`,
    '',
    body.message
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'SecureAgents web <onboarding@resend.dev>',
        to: [process.env.RESEND_TO || 'info@secureagents.cz'],
        reply_to: body.email,
        subject: `Poptávka z webu — ${body.company}`,
        text
      })
    })
    if (!response.ok) { res.status(502).json({ error: 'send-failed' }); return }
    res.status(200).json({ ok: true })
  } catch {
    res.status(502).json({ error: 'send-failed' })
  }
}
