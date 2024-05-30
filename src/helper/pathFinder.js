import { paths } from "../components/static.js";

export const get = {
    path: {
        components: (componentName, fileName) => {
            return `${paths.root}/${paths.src}/${paths.components}/${componentName}/${fileName}`
        }
    }
}