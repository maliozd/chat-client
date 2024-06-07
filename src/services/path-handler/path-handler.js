export const PathHandler = {
    component: {
        css: (componentName) => {
            return `./src/components/${componentName}/${componentName}.css`
        },
        html: (componentName) => {
            return `./src/components/${componentName}/${componentName}.html`
        }
    }
}