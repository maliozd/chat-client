export async function cssImporter(cssUrl) {
    let response = await fetch(cssUrl)
    let cssContent = await response.text()
    let element = document.createElement('style')
    element.textContent = cssContent

    return element
}