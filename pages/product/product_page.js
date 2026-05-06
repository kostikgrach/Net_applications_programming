import { ProductCardComponent } from "../../components/card/card.js";
import { BackButtonComponent } from "../../components/back-button/back-button.js";
import { MainPage } from "../main/main_page.js";
import { HeadComponent } from "../../components/head/head.js";
import { LinkButtonComponent } from "../../components/link-button/link-button.js";
import { DiffPage } from "../diff_page/diff_page.js";
import {ajax} from "../../modules/ajax.js";
import {backupTypeUrls} from "../../modules/backupTypeUrls.js";


export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        ajax.get(backupTypeUrls.getBackupTypeById(this.id), (data) => {
            this.renderData(data);
        })
    }

    renderData(item) {
        const product = new ProductCardComponent(this.pageRoot)
        product.render(item)
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page" class="d-flex flex-wrap justify-content-center align-items-center flex-grow-1"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
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
        const diffBtn = new LinkButtonComponent(header.left)
        diffBtn.render("diff", this.clickDiffLink.bind(this))
        const modelLink = new LinkButtonComponent(header.left, "3D-link")
        modelLink.render("3D", this.click3DLink.bind(this))

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(header.right)
        backButton.render(this.clickBack.bind(this))

        this.getData()
    }
}