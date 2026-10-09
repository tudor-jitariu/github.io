// Turns text into safe HTML, so odd characters can't break the page
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

const heading = (t) => (t.title ? `<h2>${esc(t.title)}</h2>` : "");
const paragraph = (s) => (s ? `<p>${esc(s)}</p>` : "");

// The top part of a tile: an image, a video, or a placeholder
function media(t) {
  if (t.type === "video" && t.youtube) {
    return `<iframe class="video-frame"
      src="https://www.youtube-nocookie.com/embed/${esc(t.youtube)}"
      title="${esc(t.title)}" loading="lazy" allowfullscreen></iframe>`;
  }
  if (t.type === "image") {
    return t.src
      ? `<img class="tile-media" src="${esc(t.src)}" alt="${esc(t.alt || t.title)}" loading="lazy">`
      : `<div class="placeholder" style="--ratio:${esc(t.ratio || "4/3")}" role="img" aria-label="Placeholder: add your image"></div>`;
  }
  return "";
}

// The text part of a tile. Each type has its own small function.
// To add a new type later, add one more line here.
const bodyRenderers = {
  text:  (t) => heading(t) + paragraph(t.body),
  image: (t) => heading(t) + paragraph(t.caption),
  video: (t) => heading(t) + paragraph(t.caption),
  quote: (t) => `<p class="quote">${esc(t.body)}</p>`,
  stat:  (t) => `<p>${esc(t.title)}</p><div class="stat-value">${esc(t.value)}</div>`,
  link:  (t) => heading(t) +
    `<p><a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.label || t.url)} →</a></p>`
};

// A tile with no categories counts as "non-assigned"
export function getCategories(tile) {
  return tile.categories && tile.categories.length ? tile.categories : ["non-assigned"];
}

// "about-me" becomes "About me"
function formatCategory(name) {
  const spaced = name.replace("-", " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function createTile(tile) {
  const element = document.createElement("article");
  const categories = getCategories(tile);

  element.className = `tile tile-${tile.type}`;
  if (tile.color) element.classList.add(`color-${tile.color}`);
  element.dataset.id = tile.id;

  const render = bodyRenderers[tile.type];
  const body = render ? render(tile) : `<p>Unknown tile type: ${esc(tile.type)}</p>`;

  element.innerHTML =
    media(tile) +
    `<div class="body">${body}<span class="tile-tag">${formatCategory(categories[0])}</span></div>`;

  return element;
}