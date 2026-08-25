/**
 * Publications shown in the desktop "library" app. Two kinds of book:
 *
 * - 'xhtml': the real exported EPUB spine pages, served as static files and
 *   shown in an iframe, keeping their own embedded interactivity intact.
 * - 'image': pre-rendered page images (a flattened PDF, for a print piece
 *   with no interactivity to lose in the first place).
 *
 * Independently, 'layout' controls whether a flip shows two half-width pages
 * side by side ('paired', for books whose source pages are single physical
 * pages) or one full-width page at a time ('single', for a PDF whose interior
 * pages are already pre-composed two-page spreads exported as one image, the
 * standard InDesign booklet export — pairing those again would double them up).
 */

export interface Ebook {
  id: string
  title: string
  subtitle: string
  /** Cover thumbnail shown in the library list. */
  cover: string
  pageCount: number
  kind: 'xhtml' | 'image'
  layout: 'single' | 'paired'
  /** Required for kind:'xhtml' only — the iframe needs the page's exact
   *  native pixel size to scale it down accurately. Image pages just use
   *  object-fit and don't need this. */
  pageWidth?: number
  pageHeight?: number
  /** Folder holding the numbered pages, under the public/ root. */
  basePath: string
  /** Page filename pattern; {n} is replaced with the 1-based page number. */
  pagePattern: string
}

export const EBOOKS: Ebook[] = [
  {
    id: 'cronache-del-segno',
    title: 'Cronache del Segno',
    subtitle: 'A small history of graphic design',
    cover: '/assets/img/projects/graphic-design-ebook.png',
    pageCount: 40,
    kind: 'xhtml',
    layout: 'paired',
    pageWidth: 768,
    pageHeight: 1024,
    basePath: '/assets/ebook/cronache-del-segno/OEBPS',
    pagePattern: 'Ruffini_EPUB1-{n}.xhtml',
  },
  {
    id: 'la-casina-guide',
    title: "Wanderer's Guide",
    subtitle: 'La Casina B&B',
    cover: '/assets/ebook/la-casina-guide/page-1.jpg',
    pageCount: 9,
    kind: 'image',
    layout: 'single',
    basePath: '/assets/ebook/la-casina-guide',
    pagePattern: 'page-{n}.jpg',
  },
]

export function ebookById(id: string): Ebook | undefined {
  return EBOOKS.find((b) => b.id === id)
}

export function pageUrl(book: Ebook, n: number): string {
  return `${book.basePath}/${book.pagePattern.replace('{n}', String(n))}`
}

export type Spread = [number | null, number | null]

/**
 * Page 1 sits alone as a cover (a blank inside-cover on its left), then pages
 * pair up two-by-two. If the count is odd the very last page ends up alone
 * too, same as a real printed book.
 */
export function buildSpreads(pageCount: number): Spread[] {
  const spreads: Spread[] = [[null, 1]]
  for (let n = 2; n <= pageCount; n += 2) {
    const right = n + 1 <= pageCount ? n + 1 : null
    spreads.push([n, right])
  }
  return spreads
}

/** One page per flip, in order — for books whose pages are already spreads. */
export function buildSinglePages(pageCount: number): Spread[] {
  const pages: Spread[] = []
  for (let n = 1; n <= pageCount; n++) pages.push([n, null])
  return pages
}

export function buildPageSequence(book: Ebook): Spread[] {
  return book.layout === 'single' ? buildSinglePages(book.pageCount) : buildSpreads(book.pageCount)
}
