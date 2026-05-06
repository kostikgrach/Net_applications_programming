import { ProductPage } from "../product/product_page.js";
import { ProductCardComponent } from "../../components/card/card.js";
import { HeadComponent } from "../../components/head/head.js";
import { LinkButtonComponent } from "../../components/link-button/link-button.js";
import { DiffPage } from "../diff_page/diff_page.js";
import {ajax} from "../../modules/ajax.js";
import {backupTypeUrls} from "../../modules/backupTypeUrls.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    
    getData() {
        ajax.get(backupTypeUrls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
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
        
        this.getData()
    }
}
