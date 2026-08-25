/** Prefixes a public/ path with the deployed base URL, so absolute asset
 *  references still resolve when the site is served from a subpath (a
 *  GitHub Pages project site) instead of domain root. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
