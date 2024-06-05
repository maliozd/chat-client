export function injectStyle(path, target) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = path;
    target.appendChild(link);
}

export function dejectStyle(link, target) {
    target.removeChild(link);
}