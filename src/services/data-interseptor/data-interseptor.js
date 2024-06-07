export function dataInterseptor(template, data) {
    const elements = template.content.querySelectorAll('*')
    elements.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/{{(.*?)}}/g, (match, holder) => {
            return data[holder]
        })
    })
}