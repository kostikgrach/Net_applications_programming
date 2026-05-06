import { ButtonComponent } from "../button/button.js";

export class limiterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <div id="limit-container" style="width: 300px; margin: 2px; align: left">
                    <input type="number" id="userLimit" placeholder="limit">
                </div>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const submit = new ButtonComponent(document.getElementById('limit-container'), 'limitBtn')
        submit.render("submit", listener)
    }
}