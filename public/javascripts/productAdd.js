const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnAdd = document.querySelector('.btnAdd');
const categoryService = new Category();
const productsService = new Products();

window.onload = showCategory();

function showCategory() {
    categoryService.getAll()
    .then(res => {
        let text = '<option value="0" disabled selected>Chọn loại sản phẩm</option>';
        res.forEach(category => {
            text += `
            <option value="${category.id}">${category.name}</option>
            `
        })
        $('#idCate').innerHTML = text;
    })
}

btnAdd.addEventListener("click", addProduct);
function addProduct(e) {
    e.preventDefault();
    let name = $('#name').value;
    let price = $('#price').value;
    let img = $('#img').value;
    let idCate = $('#idCate').value;
    let data = {"idCate" : idCate, "name" : name, "price" : price, "urlImg" : img};
    
    console.log(data);

    if(!name || !price || !idCate) {
        return alert('Chưa nhập dữ liệu thêm');
    }
    productsService.addProduct(data)
    .then(res => {
        alert('Thêm thành công');
        console.log(`Status: ${res.status}`);
    })
    .catch(error => {
        console.log(error);
    })
}