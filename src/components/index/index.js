const componentName = 'index'

import { get } from "../../helper/pathFinder.js"
import { nodeHandler } from "../../helper/nodeHandler.js"
import { styleInjector } from "../../helper/styleInjector.js"

new styleInjector('link', get.path.components(componentName, 'index.css'))

const leftPanel = new nodeHandler(document.body, 'side-panel')