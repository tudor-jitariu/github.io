import { initCV } from "./cv.js";
import { createTile, getCategories } from "./tiles.js";
import { buildFilters } from "./filters.js";
import { buildTimeline } from "./timeline.js";
import { initTheme } from "./theme.js";

const BATCH = 12; // how many tiles to add each time you scroll to the bottom

const board = document.getElementById("board");
const sentinel = document.getElementById("sentinel");
const endMessage = document.getElementById("end");

initTheme();

// Build the timeline
buildTimeline(document.getElementById("timeline"));

let allTiles = [];
let activeCategory = "all";
let shown = 0;

function visibleTiles() {
  return allTiles.filter(
    (t) => activeCategory === "all" || getCategories(t).includes(activeCategory)
  );
}

function renderMore() {
  const list = visibleTiles();
  const next = list.slice(shown, shown + BATCH);

  next.forEach((tile) => {
    const element = createTile(tile);
    board.appendChild(element);
    requestAnimationFrame(() => element.classList.add("in"));
  });

  shown += next.length;
  const done = shown >= list.length;
  endMessage.hidden = !done;
  sentinel.hidden = done;
}

// Clears the board and starts again (used on load and when a filter changes)
function reset() {
  board.innerHTML = "";
  shown = 0;
  renderMore();
  // If the screen is tall and not full yet, keep filling
  while (!sentinel.hidden && sentinel.getBoundingClientRect().top < window.innerHeight) {
    renderMore();
  }
}

async function init() {
  buildFilters(document.getElementById("filters"), (category) => {
    activeCategory = category;
    reset();
  });

  try {
    const response = await fetch("data/tiles.json");
    allTiles = await response.json();
  } catch (error) {
    console.error("Could not load tiles:", error);
  }

  reset();

  // Adds the next batch when the bottom of the page comes near
  new IntersectionObserver(
    (entries) => { if (entries[0].isIntersecting) renderMore(); },
    { rootMargin: "400px" }
  ).observe(sentinel);
}

init();
initCV();
buildTimeline(document.getElementById("timeline"));
