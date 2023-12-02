const themeSelector = document.getElementById("theme-selector");

async function updateColors(theme) {
  const themeColors = await getThemeColors(theme);
  document.documentElement.style.setProperty("--border", themeColors.border);
  document.documentElement.style.setProperty("--bg", themeColors.bg);
  document.documentElement.style.setProperty("--fg", themeColors.fg);
  document.documentElement.style.setProperty("--text", themeColors.text);
  document.documentElement.style.setProperty(
    "--secundary-text",
    themeColors["secundary-text"]
  );
  document.documentElement.style.setProperty("--primary", themeColors.primary);
}

window.addEventListener("load", async () => {
  const theme = localStorage.getItem("theme");
  updateColors(theme);
});

themeSelector.addEventListener("change", async () => {
  const selectedTheme = themeSelector.value;
  localStorage.setItem("theme", selectedTheme);
  updateColors(selectedTheme);
});

async function getThemeColors(theme) {
  const response = await fetch(
    "https://jsonserver.adelinocompiani.repl.co/themes"
  );
  const themes = await response.json();
  return themes[theme];
}
