function renderInline(text, keyPrefix = 'inline') {
  const tokens = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={key} className="font-medium text-kb-ink">{renderInline(token.slice(2, -2), key)}</strong>;
    }

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return <a key={key} href={link[2]} className="text-kb-accent-ink underline decoration-kb-accent/35 underline-offset-4 transition-colors hover:text-kb-accent-hover">{link[1]}</a>;
    }

    return token;
  });
}

function sectionId(anchorPrefix, heading) {
  const numbered = heading.match(/^(\d+)\./);
  if (numbered) return `${anchorPrefix}-section-${numbered[1]}`;
  return `${anchorPrefix}-${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

function LegalDocument({ anchorPrefix, markdown }) {
  const lines = markdown.split('\n');
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    const listIndex = blocks.length;
    blocks.push(
      <ul key={`list-${listIndex}`} className="my-6 space-y-2.5 pl-1">
        {listItems.map((item, index) => (
          <li key={`${listIndex}-${index}`} className="grid grid-cols-[8px_1fr] gap-4 font-inter text-[15px] font-light leading-7 text-kb-ink-soft sm:text-base">
            <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-kb-accent"></span>
            <span>{renderInline(item, `list-${listIndex}-${index}`)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, lineIndex) => {
    const value = line.trim();
    if (!value) {
      flushList();
      return;
    }

    if (value.startsWith('# ') || value.startsWith('**Last updated:')) return;

    if (value.startsWith('* ')) {
      listItems.push(value.slice(2));
      return;
    }

    flushList();

    if (value.startsWith('## ')) {
      const heading = value.slice(3);
      blocks.push(
        <h2 id={sectionId(anchorPrefix, heading)} key={`h2-${lineIndex}`} className="scroll-mt-32 border-t border-kb-line pt-12 font-space-grotesk text-2xl font-medium leading-tight tracking-tight text-kb-ink first:border-t-0 first:pt-0 sm:text-3xl">
          {heading}
        </h2>,
      );
      return;
    }

    if (value.startsWith('### ')) {
      blocks.push(<h3 key={`h3-${lineIndex}`} className="mt-8 font-space-grotesk text-xl font-medium tracking-tight text-kb-ink sm:text-2xl">{value.slice(4)}</h3>);
      return;
    }

    blocks.push(<p key={`p-${lineIndex}`} className="font-inter text-[15px] font-light leading-7 text-kb-ink-soft sm:text-base sm:leading-8">{renderInline(value, `p-${lineIndex}`)}</p>);
  });

  flushList();

  return <div className="space-y-5">{blocks}</div>;
}

export default function LegalDocumentPage({
  anchorPrefix,
  documentIntro,
  documentTitle,
  eyebrow,
  lastUpdated,
  markdown,
  navigation,
  title,
}) {
  const overviewId = `${anchorPrefix}-overview`;

  return (
    <>
      <section className="relative min-h-[500px] overflow-hidden bg-kb-inverse pb-44 pt-44 text-kb-inverse-text sm:min-h-[560px] sm:pb-52 sm:pt-52">
        <img src="/privacy-assets/privacy-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 font-space-grotesk text-xs font-medium uppercase tracking-[0.2em] text-kb-accent-light sm:text-sm">{eyebrow}</p>
            <h1 className="font-space-grotesk text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-6 font-inter text-base font-light text-white/75 sm:text-lg">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      <section id={overviewId} className="relative z-10 -mt-28 bg-kb-canvas pb-24 sm:-mt-32 sm:pb-32">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-8">
          <aside className="rounded-2xl border border-kb-line bg-kb-canvas/95 p-5 shadow-sm backdrop-blur-sm lg:sticky lg:top-32 lg:border-0 lg:bg-transparent lg:p-0 lg:pt-12 lg:shadow-none">
            <p className="mb-5 font-space-grotesk text-[10px] font-medium uppercase tracking-[0.2em] text-kb-ink-muted">On this page</p>
            <nav aria-label={`${title} sections`} className="grid gap-2 sm:grid-cols-2 lg:block lg:space-y-2">
              {navigation.map(([label, href], index) => (
                <a key={href} href={`#${href}`} className="group flex items-center gap-3 rounded-xl px-3 py-2.5 font-inter text-sm font-light text-kb-ink-muted transition-colors hover:bg-kb-surface hover:text-kb-ink">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-space-grotesk text-[10px] transition-colors ${index === 0 ? 'border-kb-accent bg-kb-accent text-kb-on-accent' : 'border-kb-line-strong bg-kb-surface text-kb-ink-muted group-hover:border-kb-accent/50'}`}>{String(index + 1).padStart(2, '0')}</span>
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </aside>

          <article className="rounded-[1.75rem] border border-kb-line bg-kb-surface px-6 py-10 shadow-[0_24px_70px_rgba(63,48,36,0.12)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="mb-12 border-b border-kb-line pb-10">
              <p className="font-space-grotesk text-[10px] font-medium uppercase tracking-[0.2em] text-kb-accent-ink">Kitebaze legal</p>
              <h2 className="mt-4 font-space-grotesk text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">{documentTitle}</h2>
              <p className="mt-4 max-w-2xl font-inter text-sm font-light leading-7 text-kb-ink-muted sm:text-base">{documentIntro}</p>
            </div>
            <LegalDocument anchorPrefix={anchorPrefix} markdown={markdown} />
          </article>
        </div>
      </section>
    </>
  );
}
