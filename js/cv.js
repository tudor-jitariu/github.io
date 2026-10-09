// Change this if your PDF has a different name
const PDF_URL = "assets/Tudor-Jitariu-CV.pdf";

export function initCV() {
  const button = document.getElementById("cv-button");
  const overlay = document.getElementById("cv-overlay");
  const spread = document.getElementById("cv-spread");
  const prev = document.getElementById("cv-prev");
  const next = document.getElementById("cv-next");
  const close = document.getElementById("cv-close");
  const status = document.getElementById("cv-status");

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  let pdf = null;        // the loaded PDF (loaded on first open)
  let startPage = 1;     // first page currently shown
  let renderId = 0;      // lets us cancel an out-of-date render

  // Two pages on a wide screen, one on a phone
  const pagesPerView = () => (window.innerWidth < 700 ? 1 : 2);

  async function renderSpread() {
    const id = ++renderId;
    spread.innerHTML = "";

    const count = pagesPerView();
    const pages = [];
    for (let n = startPage; n < startPage + count && n <= pdf.numPages; n++) pages.push(n);

    const gap = 8;
    const availWidth = (spread.clientWidth - gap * (count - 1)) / count;
    const availHeight = spread.clientHeight;
    const ratio = window.devicePixelRatio || 1;

    for (const n of pages) {
      const page = await pdf.getPage(n);
      if (id !== renderId) return;

      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(availWidth / base.width, availHeight / base.height);
      const viewport = page.getViewport({ scale: scale * ratio });

      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / ratio}px`;
      canvas.style.height = `${viewport.height / ratio}px`;
      spread.appendChild(canvas);

      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    }

    const last = Math.min(startPage + count - 1, pdf.numPages);
    status.textContent =
      startPage === last
        ? `Page ${startPage} of ${pdf.numPages}`
        : `Pages ${startPage}–${last} of ${pdf.numPages}`;
    prev.disabled = startPage <= 1;
    next.disabled = startPage + count > pdf.numPages;
  }

  async function open() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => overlay.classList.add("open")); // triggers the fade-in
    close.focus();

    try {
      if (!pdf) {
        spread.textContent = "Loading CV…";
        pdf = await pdfjsLib.getDocument(PDF_URL).promise;
      }
      startPage = 1;
      await renderSpread();
    } catch (error) {
      console.error("Could not load the CV:", error);
      spread.textContent = "Sorry, the CV could not be loaded. Use the Download link below.";
    }
  }

  function shut() {
    overlay.classList.remove("open"); // fade out
    document.body.style.overflow = "";
    setTimeout(() => { overlay.hidden = true; }, 300);
    button.focus();
  }

  function go(step) {
    startPage = Math.max(1, startPage + step * pagesPerView());
    renderSpread();
  }

  button.addEventListener("click", open);
  close.addEventListener("click", shut);
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  // Clicking the dim background closes it
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target === spread) shut();
  });

  document.addEventListener("keydown", (e) => {
    if (overlay.hidden) return;
    if (e.key === "Escape") shut();
    if (e.key === "ArrowLeft" && !prev.disabled) go(-1);
    if (e.key === "ArrowRight" && !next.disabled) go(1);
  });

  // Redraw if the window is resized while the CV is open
  window.addEventListener("resize", () => {
    if (!overlay.hidden && pdf) renderSpread();
  });
}
