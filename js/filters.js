// The category buttons. Edit this list to add, remove or rename a category.
export const CATEGORIES = [
  ["all", "All"],
  ["life", "Life"],
  ["work", "Work"],
  ["about-me", "About me"],
  ["running", "Running"],
  ["interest", "Interest"],
  ["travel", "Travel"],
  ["non-assigned", "Non-assigned"]
];

// Builds the buttons. When one is clicked, onChange(categoryKey) is called.
export function buildFilters(container, onChange) {
  CATEGORIES.forEach(([key, label]) => {
    const button = document.createElement("button");
    button.textContent = label;
    button.setAttribute("aria-pressed", key === "all");

    button.addEventListener("click", () => {
      container.querySelectorAll("button").forEach((b) =>
        b.setAttribute("aria-pressed", b === button)
      );
      onChange(key);
    });

    container.appendChild(button);
  });
}