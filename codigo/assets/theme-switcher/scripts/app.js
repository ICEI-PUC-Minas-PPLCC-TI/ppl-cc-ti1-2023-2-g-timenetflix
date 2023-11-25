const themeSelector = document.getElementById("theme-selector");

themeSelector.addEventListener("change", async () => {
    const selectedTheme = themeSelector.value;
    const themeColors = await getThemeColors(selectedTheme);
    document.documentElement.style.setProperty("--border", themeColors.border);
    document.documentElement.style.setProperty("--bg", themeColors.bg);
    document.documentElement.style.setProperty("--fg", themeColors.fg);
    document.documentElement.style.setProperty("--text", themeColors.text);
    document.documentElement.style.setProperty("--secundary-text", themeColors["secundary-text"]);
    document.documentElement.style.setProperty("--primary", themeColors.primary);
});

async function getThemeColors(theme) {
    const response = await fetch("https://jsonserver.adelinocompiani.repl.co/themes")
    const themes = await response.json()
    return themes[theme];
}
