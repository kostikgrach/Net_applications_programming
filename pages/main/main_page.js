import { ProductPage } from "../product/product_page.js";
import { ProductCardComponent } from "../../components/card/card.js";
import { HeadComponent } from "../../components/head/head.js";
import { LinkButtonComponent } from "../../components/link-button/link-button.js";
import { DiffPage } from "../diff_page/diff_page.js";
import {ajax} from "../../modules/ajax.js";
import {backupTypeUrls} from "../../modules/backupTypeUrls.js";
import { limiterComponent } from "../../components/limiter/limiter.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.limit = 0;
    }
    
    getData() {
        const params = new URLSearchParams(window.location.search);
        console.log(params)
        if (params.get('title')) {
            ajax.get(backupTypeUrls.getBackupTypeByTitle(params.get('title')), (data) => {
                this.renderData(data);
            })
        } else {
            ajax.get(backupTypeUrls.getBackupTypes(), (data) => {
                this.renderData(data);
            })
        }
    }

    renderData(items) {
        this.pageRoot.innerHTML = ""
        items = (this.limit == 0) ? items : items.slice(0, this.limit)
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

    setLimit() {
        this.limit = document.getElementById('userLimit').value
        this.getData()
    }

    render() {
        this.parent.innerHTML = ''
        const header = new HeadComponent(this.parent)
        header.render()
        const diffBtn = new LinkButtonComponent(header.left, "diff-link")
        diffBtn.render("diff", this.clickDiffLink.bind(this))
        const modelLink = new LinkButtonComponent(header.left, "3D-link")
        modelLink.render("3D", this.click3DLink.bind(this))
        const limiter = new limiterComponent(this.parent)
        limiter.render(this.setLimit.bind(this))

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        this.getData()
    }
}
