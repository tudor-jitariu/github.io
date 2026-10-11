const TIMELINE = [
  { year: "September 2012", title: "Started studying at the National College of Fine Art", note: "Bacau, Romania" },
  { year: "July 2016", title: "Graduated from the National College of Fine Art", note: "Bacau, Romania — Romanian Baccalaureate in Romanian, History, Geography, English, Computer Science, Art." },
  { year: "September 2016", title: "Moved to Nottingham", note: "UK" },
  { year: "September 2016", title: "Started studying Architecture BArch (RIBA/ARB Part 1)", note: "The University of Nottingham" },
  { year: "July 2017", title: "Summer Placement at Mapamond Engineering Office", note: "Bacau, Romania — 2 Month Placement" },
  { year: "July 2018", title: "Summer Placement at Fletcher-Priest Architects", note: "London, UK — 2 Months Placement" },
  { year: "July 2019", title: "Graduated from The University of Nottingham", note: "First-Class Architecture BArch (Hons) Degree" },
  { year: "August 2019", title: "Moved to London", note: "UK" },
  { year: "August 2019", title: "Part 1 Architectural Assistant at RSHP", note: "London, UK" },
  { year: "August 2020", title: "Finished Part 1 Architectural Assistant role at RSHP", note: "London, UK" },
  { year: "September 2020", title: "Started studying Architecture MArch (RIBA/ARB Part 2)", note: "The Bartlett, UCL" },
  { year: "July 2021", title: "Rejoined RSHP as a Part 2 Architectural Assistant", note: "Summer Placement" },
  { year: "July 2022", title: "Graduated from The Bartlett, UCL", note: "Distinction MArch Degree" },
  { year: "August 2022", title: "Rejoined RSHP as a Part 2 Architectural Assistant", note: "London, UK" },
  { year: "September 2024", title: "Started studying Architecture PGDiploma (RIBA/ARB Part 3)", note: "The University of Westminster, London" },
  { year: "November 2025", title: "Graduated from the University of Westminster", note: "London, UK" }
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
        ${e.note ? `<p>${esc(e.note)}</p>` : ""}
      </li>`).join("") +
    `</ol>`;
}
