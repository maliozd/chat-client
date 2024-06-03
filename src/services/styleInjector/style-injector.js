export class StyleInjector {
    constructor(path, target) {
        this.path = path || null;
        this.target = target || null;

        if (this.path && this.target) {
            this.link = document.createElement("link");
            this.link.rel = "stylesheet";
            this.link.href = this.path;

            this.inject()
        }
    }

    inject() {
        this.target.appendChild(this.link);
    }

    deject() {
        this.target.removeChild(this.link);
    }
}