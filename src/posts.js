// Články blogu. Nejnovější nahoře.
//
// body: první položka je perex (zobrazí se v přehledu i pod nadpisem článku).
//   '## Text'  = mezititulek
//   '> Text'   = poznámka pod čarou (menší, odsazená)
//   [text](/cesta) nebo [text](https://…) = odkaz uvnitř odstavce
// image: volitelná cesta k titulnímu obrázku (např. '/blog/kde-zacit.webp', poměr 16:9).
//   Dokud chybí, zobrazí se zástupná grafika s ikonou podle pole `icon`.
export const posts = [
  {
    slug: 'kde-s-ai-agentem-zacit',
    title: 'Kde s AI agentem začít: čtyři znaky vhodného procesu',
    date: 'Listopad 2026',
    icon: 'start',
    image: null,
    body: [
      'Firmy, které o AI agentovi uvažují, většinou netrápí, jestli to jde. Trápí je, kde začít. Dobrý první proces poznáte podle čtyř znaků.',
      '## 1. Opakuje se',
      'Dělá se každý den nebo týden a pokaždé podobně: přepisování údajů z e-mailů do systému, pravidelný report, kontrola příchozích dokladů. Co se děje jednou za rok, se automatizovat nevyplatí.',
      '## 2. Má jasná pravidla',
      'Když dokážete postup vysvětlit novému kolegovi za odpoledne, zvládne ho i agent. Kde se rozhoduje „podle citu“, je potřeba pravidla nejdřív sepsat.',
      '## 3. Data už jsou v systémech',
      'Agent pracuje s tím, co najde v e-mailu, účetnictví, CRM nebo databázi. Pokud podklady existují jen na papíře nebo v hlavách lidí, začíná se jinde.',
      '## 4. Chyba se dá zachytit',
      'Ideální první proces je takový, kde výsledek před odesláním někdo zkontroluje, nebo kde se omyl dá snadno vrátit. Agent připraví, člověk schválí. Která oprávnění si zaslouží největší opatrnost, popisujeme v článku [Tři oprávnění, která bychom AI agentovi nedali bez rozmyslu](/blog/tri-opravneni-pro-ai-agenta).',
      '## Kde naopak nezačínat',
      'U rozhodování o lidech, například při hodnocení zaměstnanců nebo výběru uchazečů. Tam jsou vyšší nároky na dohled i přísnější pravidla podle evropského AI Actu. Víc v článku [Co pro vaši firmu znamená AI Act](/blog/ai-act-pro-firmy).',
      'A jedna poctivá poznámka na konec. U části procesů vyjde najevo, že AI vůbec nepotřebují a stačí obyčejný skript. Je levnější a spolehlivější, a i to je dobrý výsledek.',
      'Nevíte, který proces u vás vybrat? [Projdeme to s vámi na nezávazné konzultaci](/kontakt).'
    ]
  },
  {
    slug: 'ai-act-pro-firmy',
    title: 'Co pro vaši firmu znamená AI Act — a co ne',
    date: 'Září 2026',
    icon: 'law',
    image: null,
    body: [
      'Když se řekne AI Act, většina firem si představí buď paniku, nebo že se jich to netýká. Realita je střízlivější a stojí za to ji znát dřív, než AI ve firmě nasadíte.',
      '## Termíny se posunuly',
      'Evropský zákon o umělé inteligenci se zavádí postupně a letos v červenci se část harmonogramu změnila ([nařízení (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj)). Přísná pravidla pro takzvané vysoce rizikové systémy, kam patří třeba hodnocení zaměstnanců nebo rozhodování o lidech, začnou platit až 2. prosince 2027, ne v srpnu 2026.',
      'Pokud jste četli, že „od srpna 2026 platí přísná pravidla pro AI“, už to neplatí.',
      '## Co platí už teď',
      'Od února 2025 platí zákaz nepřijatelných praktik a také požadavek na takzvanou AI gramotnost: lidé, kteří s AI pracují, mají rozumět tomu, co dělá a jaká má omezení.',
      'Letošní novela tento požadavek zmírnila. Firma už nemusí zaručit konkrétní úroveň znalostí, má ale přijmout opatření, která je rozvíjejí. Zaškolit tým proto dává smysl dál.',
      '## Kdo za co odpovídá',
      'Zákon rozlišuje toho, kdo systém vyvíjí, a toho, kdo ho používá. Firma, která si nechá agenta nasadit, je v roli uživatele.',
      'U vysoce rizikových systémů z toho plynou konkrétní povinnosti: informovat zaměstnance, kterých se nasazení týká, a zajistit skutečný lidský dohled, ne automatické „ano“ na všechno, co AI navrhne.',
      '## Co to znamená v praxi',
      'Většina nasazení, se kterými se setkáváme — automatizace procesů, hlídání provozních dat, interní asistenti — mezi vysoce rizikové systémy nepatří.',
      'Přesto do každého návrhu dáváme tři věci, které s AI Actem souvisejí: zaškolení týmu, záznam všech kroků agenta a [lidské schválení u citlivých úkonů](/jak-to-funguje#opravneni). Dělali bychom to tak i bez zákona.',
      '> Tento text je zjednodušený přehled, ne právní poradenství. Pro konkrétní situaci ve vaší firmě doporučujeme konzultaci s právníkem. Naposledy aktualizováno: listopad 2026.'
    ]
  },
  {
    slug: 'ai-agent-na-vlastnim-serveru',
    title: 'Proč mít AI agenta na vlastním serveru',
    date: 'Srpen 2026',
    icon: 'server',
    image: null,
    body: [
      'Většina AI nástrojů funguje jako online služba: vaše data putují na servery někoho jiného a vy věříte smluvním podmínkám, které se mohou kdykoli změnit. U procesů, kde figurují e-maily, smlouvy nebo zákaznická data, je to riziko, kterému se dá vyhnout.',
      '## Co zůstává u vás',
      'Agent na vlastním serveru běží na vašem hardwaru, nebo na serveru, který si pronajmete jen pro sebe. Historie, přístupová oprávnění i logika automatizací zůstávají u vás.',
      'K poskytovateli AI modelu jde jen samotný dotaz, žádný průběžný přístup k datům. Jak to vypadá v praxi, ukazuje [schéma nasazení](/jak-to-funguje#architektura).',
      '## Rozhodujete vy',
      'O tom, kdo se k datům dostane, rozhodujete vy. A to bez ohledu na to, jak si kdo upraví obchodní podmínky.',
      '## Co to stojí navíc',
      'Vyšší nárok na počáteční návrh. Oprávnění a oddělení dat je potřeba promyslet předem. Po incidentu se to dělá podstatně hůř.'
    ]
  },
  {
    slug: 'tri-opravneni-pro-ai-agenta',
    title: 'Tři oprávnění, která bychom AI agentovi nedali bez rozmyslu',
    date: 'Srpen 2026',
    icon: 'lock',
    image: null,
    body: [
      'Nadšení z toho, co všechno agent dokáže automatizovat, snadno vede k tomu, že dostane širší přístup, než potřebuje. U tří oprávnění se vždy zastavíme a ptáme se, jestli jsou opravdu nutná.',
      '## 1. Odesílání e-mailů bez schválení',
      'Agent, který sám odpovídá klientům nebo partnerům, může poslat něco, co jste neschválili. U komunikace navenek je bezpečnější, když agent odpověď připraví a člověk ji odešle.',
      '## 2. Přístup k platbám a fakturaci',
      'Chyba v logice nebo v datech se tu okamžitě promítne do peněz. Tahle oprávnění dáváme jen tam, kde je jasná kontrola a schvalovací krok.',
      '## 3. Celé úložiště místo jedné složky',
      'Dát agentovi přístup ke všemu je jednodušší než vybírat. Rozsah má ale odpovídat úkolu, který agent dělá dnes. Co bude potřeba za půl roku, se dá přidat později.',
      'Jak oprávnění nastavujeme u každého nasazení, najdete na stránce [Bezpečnost](/jak-to-funguje#opravneni).'
    ]
  },
  {
    slug: 'proc-faktura-za-ai-kolisa',
    title: 'Proč faktura za AI kolísá a jak ji udržet pod kontrolou',
    date: 'Srpen 2026',
    icon: 'cost',
    image: null,
    body: [
      'Provoz AI modelu se platí podle množství zpracovaného textu. Čím delší zadání a čím delší odpověď, tím vyšší cena za jeden dotaz. Proto může měsíční částka kolísat i při zdánlivě stejném objemu práce.',
      '## Tři způsoby, jak držíme náklady dole',
      'Jednoduché úlohy jdou na levnější model a výkonnější dostává jen to, co ho opravdu potřebuje.',
      'Agent nedostává ke každému dotazu celou historii, jen to podstatné.',
      'A pokyny, které se opakují, se nezpracovávají pokaždé od nuly.',
      '## Strop a měsíční přehled',
      'Každé nasazení má měsíční strop útraty a upozornění před jeho dosažením. Jednou měsíčně posíláme přehled, ze kterého je vidět, kam peníze šly a proč se částka případně změnila.',
      'Celý přístup k nákladům shrnujeme na stránce [Bezpečnost](/jak-to-funguje#naklady).'
    ]
  }
]

export const postPath = (post) => `/blog/${post.slug}`
export const findPost = (path) => posts.find((post) => postPath(post) === path.replace(/\/$/, ''))
