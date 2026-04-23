export class ButtonComponent {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    addListeners(listener) {
        document
            .getElementById(this.id)
            .addEventListener("click", listener)
    }

    getHTML(text) {
        return (
            `
                <button id="${this.id}" class="btn btn-primary" type="button">${text}</button>
            `
        )
    }

    render(text, listener) {
        const html = this.getHTML(text)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}