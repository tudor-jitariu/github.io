const THEME_KEY = "site-theme";

export function initTheme() {
  const button = document.getElementById("theme-button");
  if (!button) return;

  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark-mode", isDark);
    button.textContent = isDark ? "Light mode" : "Dark mode";
    button.setAttribute("aria-pressed", String(isDark));
    localStorage.setItem(THEME_KEY, theme);
  }

  setTheme(initialTheme);
  button.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark-mode");
    setTheme(isDark ? "light" : "dark");
  });
}
