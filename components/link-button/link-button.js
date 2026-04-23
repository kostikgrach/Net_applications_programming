export class LinkButtonComponent {
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
                <style>
                    .custom-link {
                      --bs-link-color: #28a745;    /* Default link color */
                      --bs-link-hover-color: #2fc953; /* Link color on hover */
                    }
                </style>
                <button id="${this.id}" class="btn btn-link custom-link" type="button">${text}</button>
            `
        )
    }

    render(text, listener) {
        const html = this.getHTML(text)
        this.parent.insertAdjacentHTML('afterbegin', html)
        this.addListeners(listener)
    }
}