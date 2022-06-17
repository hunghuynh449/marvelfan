const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const categoryService = new Category();
const btnDelete = document.querySelector('.btnDelete');
const btnAdd = document.querySelector('.btnAdd');
const url = new URLSearchParams(location.search);
const id = params.get("id")
window.onload = showCategory();

function showCategory() {
    categoryService.getAll()
    .then(res => {
        // console.log(res);
        $('nameCategory').value = "";
        let text = '';
        res.forEach(category => {
            text += `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>
                    <button class="btnEdit"><a href="categoryEdit.html">Sửa</a></button>
                    <button class="btnDelete" onclick="deleteCate(${category.id})">Xóa</button>
                </td>
            </tr>
            `
        })
        $('#listCategory').innerHTML = text;
    })
}