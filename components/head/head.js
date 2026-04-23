export class HeadComponent {
    constructor(parent) {
        this.parent = parent
        this.html = `
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
              <ul id="header-left" class="nav col-6 col-md-auto mb-2 justify-content-left mb-md-0 gap-3 px-3"></ul>
              <ul id="header-right" class="nav col-6 col-md-auto mb-2 justify-content-right mb-md-0 gap-3 px-3"></ul>
            </header>`
        
    }

    get left() {
        return document.getElementById('header-left')
    }

    get right() {
        return document.getElementById('header-right')
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.html)
    }
}