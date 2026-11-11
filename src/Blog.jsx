import { useState } from 'react'
import { AsideCta, Button, Footer } from './components'
import { findPost, postPath, posts } from './posts'
import { Link, usePath } from './router'

const COVER_ICONS = {
  start: <><path d="M5 21V4" /><path d="M5 4.5h12l-2.4 3.75L17 12H5" /></>,
  law: <><path d="M12 4v16" /><path d="M7.5 20h9" /><path d="M5.5 7.5h13" /><path d="M5.5 7.5 3 13.5a2.6 2.6 0 0 0 5 0z" /><path d="M18.5 7.5 16 13.5a2.6 2.6 0 0 0 5 0z" /></>,
  server: <><rect x="3" y="4" width="18" height="6.5" rx="1.6" /><rect x="3" y="13.5" width="18" height="6.5" rx="1.6" /><path d="M6.6 7.2h.01M6.6 16.8h.01" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.4" /><path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" /></>,
  cost: <><path d="M4 19.5h16" /><path d="M5 15.5l4.2-4.2 3 3L19 7" /><path d="M15 7h4v4" /></>
}

// Titulní obrázek článku; dokud článek nemá vlastní `image`, kreslí se zástupná grafika.
function Cover({ post }) {
  if (post.image) return <img className="cover" src={post.image} alt="" loading="lazy" />
  return <div className="cover" aria-hidden="true"><span className="cover-badge"><svg viewBox="0 0 24 24">{COVER_ICONS[post.icon] || COVER_ICONS.start}</svg></span></div>
}

function RichText({ text }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!link) return part
    return link[2].startsWith('/') ? <Link key={index} to={link[2]}>{link[1]}</Link> : <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>
  })
}

function Block({ text }) {
  if (text.startsWith('## ')) return <h2>{text.slice(3)}</h2>
  if (text.startsWith('> ')) return <p className="article-note"><RichText text={text.slice(2)} /></p>
  return <p><RichText text={text} /></p>
}

function PostCard({ post, featured = false }) {
  return <Link className={`post-card${featured ? ' featured' : ''}`} to={postPath(post)}><Cover post={post} /><div className="post-card-body"><span className="blog-tag">{post.date}</span><h3>{post.title}</h3><p>{post.body[0]}</p><span className="blog-more">Číst článek →</span></div></Link>
}

export function BlogPage({ onOpenCookies }) {
  const [latest, ...older] = posts
  return <>
    <section className="hero compact no-border"><div className="wrap"><div className="eyebrow">Blog</div><h1>Poznámky z <em>provozu AI agentů</em></h1><p className="lede">Krátké texty o tom, kde s AI začít, jak ji nasadit bezpečně a jak udržet náklady pod kontrolou.</p></div></section>
    <section><div className="wrap"><PostCard post={latest} featured /><div className="post-grid">{older.map((post) => <PostCard key={post.slug} post={post} />)}</div></div></section>
    <Footer onOpenCookies={onOpenCookies} />
  </>
}

function Share({ post }) {
  const [copied, setCopied] = useState(false)
  const url = `https://secureagents.cz${postPath(post)}`
  const copy = () => { navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }).catch(() => {}) }
  return <div className="share"><span>Sdílet</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a><button className="text-button" onClick={copy}>{copied ? 'Odkaz zkopírován ✓' : 'Kopírovat odkaz'}</button></div>
}

export function BlogPostPage({ onOpenCookies }) {
  const post = findPost(usePath())
  if (!post) return <>
    <section className="hero compact no-border"><div className="wrap"><div className="eyebrow">Blog</div><h1>Tenhle článek <em>jsme nenašli</em></h1><p className="lede">Možná se přesunul. Všechny články najdete v přehledu.</p><div className="cta-row"><Button to="/blog" primary>Všechny články</Button></div></div></section>
    <Footer onOpenCookies={onOpenCookies} />
  </>
  const [lede, ...blocks] = post.body
  const index = posts.indexOf(post)
  const related = [1, 2].map((offset) => posts[(index + offset) % posts.length])
  return <>
    <section className="hero compact no-border article-hero"><div className="wrap"><Link className="back-link" to="/blog">← Všechny články</Link><div className="eyebrow">{post.date}</div><h1 className="article-title">{post.title}</h1><p className="lede">{lede}</p></div></section>
    <section className="article-section"><div className="wrap content-layout"><article className="article-body"><Cover post={post} />{blocks.map((text, i) => <Block key={i} text={text} />)}<Share post={post} /></article><AsideCta title="Řešíte něco podobného?">Projdeme s vámi, kde by agent ve vaší firmě dával smysl a kde ne.</AsideCta></div></section>
    <section><div className="wrap"><div className="section-head"><div className="eyebrow">Další čtení</div><h2>Mohlo by vás zajímat</h2></div><div className="post-grid">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div></div></section>
    <Footer onOpenCookies={onOpenCookies} />
  </>
}
