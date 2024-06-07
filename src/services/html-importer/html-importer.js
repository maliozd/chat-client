import { dataInterseptor } from "../data-interseptor/data-interseptor.js"

export async function htmlImporter(htmlUrl, data) {
    let response = await fetch(htmlUrl)
    let htmlContent = await response.text()
    let template = document.createElement('template')

    template.innerHTML = htmlContent

    dataInterseptor(template, data)

    return template
}