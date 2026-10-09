const TIMELINE = [
  { year: "2016", title: "Started studying architecture", note: "One line about it." },
  { year: "2020", title: "First job", note: "Where and doing what." },
  { year: "2023", title: "Moved to London", note: "One line about it." },
  { year: "2026", title: "Now", note: "What you are working on." }
];

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function buildTimeline(container) {
  container.innerHTML =
    `<h2>Timeline</h2><ol class="timeline-list">` +
    TIMELINE.map((e) => `
      <li class="timeline-item">
        <span class="timeline-year">${esc(e.year)}</span>
        <strong>${esc(e.title)}</strong>
        <p>${esc(e.note)}</p>
      </li>`).join("") +
    `</ol>`;
}