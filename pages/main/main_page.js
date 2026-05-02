import { ProductPage } from "../product/product_page.js";
import { ProductCardComponent } from "../../components/card/card.js";
import { HeadComponent } from "../../components/head/head.js";
import { LinkButtonComponent } from "../../components/link-button/link-button.js";
import { DiffPage } from "../diff_page/diff_page.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        return [
            {
                id: 1,
                src: "../../images/tape.png",
                title: "Ленты",
                text: "Созданеие бэкапа на магнитных летах"
            },
            {
                id: 2,
                src: "../../images/drive.png",
                title: "Диски",
                text: "Созданеие бэкапа на жестких дисках"
            },
            {
                id: 3,
                src: "../../images/cloud.png",
                title: "Облако",
                text: "Созданеие бэкапа на облачном хранилище"
            },
        ]
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap justify-content-center align-items-center flex-grow-1"><div/>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    clickDiffLink() {
        const diffPage = new DiffPage(this.parent)
        diffPage.render()
    }

    click3DLink() {
        window.location.href = `detail.html?id=0`;
    }

    render() {
        this.parent.innerHTML = ''
        const header = new HeadComponent(this.parent)
        header.render()
        const diffBtn = new LinkButtonComponent(header.left, "diff-link")
        diffBtn.render("diff", this.clickDiffLink.bind(this))
        const modelLink = new LinkButtonComponent(header.left, "3D-link")
        modelLink.render("3D", this.click3DLink.bind(this))

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }
}
