import { MainPage } from "../main/main_page.js";
import { HeadComponent } from "../../components/head/head.js";
import { ButtonComponent } from "../../components/button/button.js";
import { LinkButtonComponent } from "../../components/link-button/link-button.js";

export class DiffPage {
    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById('diff-page')
    }

    getHTML() {
        return (
            `
                <div id="diff-page" class="d-flex flex-wrap justify-content-center align-items-center flex-grow-1 gap-3">
                    <div id="diff-main" class="row">
                        <p>Введите файлы в формате *имя файла*: DD.MM.YYYY разделяя их с помощью ", "</p>
                        <div class="col-md-6 mb-3">
                            <label for="files" class="form-label">Файлы</label>
                            <textarea id="files" class="form-control" rows="4" placeholder="filename1: date1, filename2: date2, ..."></textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="backups" class="form-label">Бекапы</label>
                            <textarea id="backups" class="form-control" rows="4" placeholder="filename1: date1, filename2: date2, ..."></textarea>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="reverse">
                            <label class="form-check-label" for="reverse">Обратный порядок</label>
                        </div>
                        <p>Требуют сохранения:</p>
                        <div class="border rounded p-3 mb-3 bg-light text-dark" id="result"></div>
                    </div>
                </div>
            `
        )
    }

    clickMain() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    click3DLink() {
        window.location.href = `detail.html?id=0`;
    }

    compare() {
        const files = document.getElementById("files").value;
        const backups = document.getElementById("backups").value;
        const output_field = document.getElementById("result");

        let result = diff(files.split(", "), backups.split(", "));

        if (document.getElementById("reverse").checked) {
            result = inverse(result);
        }

        output_field.innerHTML = result.join(", ");
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeadComponent(this.parent);
        header.render();
        const main_link = new LinkButtonComponent(header.left, "main-link");
        main_link.render("Главная", this.clickMain.bind(this))
        const modelLink = new LinkButtonComponent(header.left, "3D-link")
        modelLink.render("3D", this.click3DLink.bind(this))


        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const confirm_btn = new ButtonComponent(document.getElementById("diff-main"), "confirm-btn");
        confirm_btn.render("Сравнить", this.compare.bind(this))
    }
}

function diff(files, backups) {
    let result = [];
    for (let i = 0; i < files.length; i++) {
        if (!backups.includes(files[i])) {
            result.push(files[i]);
        }
    }
    return result;
}

function inverse(list) {
    let result = []
    while (list.length != 0) {
        result.push(list.pop())
    }
    return result;
}