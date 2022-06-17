const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productsService = new Products();
const categoryService = new Category();
const btnDelete = document.querySelector('.btnDelete');
const btnUpdate = document.querySelector('.btnUpdate');
let nameProducts = [], priceProducts = [], cateProducts = [];
let editProductId;


window.onload = showProducts();

function showProducts() {
    productsService.getAll()
    .then(res => {
        // console.log(res);
        let text = '';
        res.forEach(product => {
            text += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><img src="${product.urlImg}" alt=""></td>
                <td>${product.price}</td>
                <td>${product.idCate}</td>
                <td>
                    <button class="btnEdit" onclick="updateProduct(${product.id})">Sửa</button>
                    <button class="btnDelete" onclick="deleteProduct(${product.id})"><a href="#">Xóa</a></button>
                </td>
            </tr>
            `
            nameProducts[product.id] = product.name;
            priceProducts[product.id] = product.price;
            cateProducts[product.id] = product.idCate;
        })
        $('#listProducts').innerHTML = text;
    })
}

function showCategory(id) {
    categoryService.getAll()
    .then(res => {
        let s;
        let text = '<option value="0" disabled>Chọn loại sản phẩm</option>';
        res.forEach(category => {
            if(id == category.id) {
                s = "selected";
            } else {
                s = ""
            }
            text += `
            <option value="${category.id}" ${s}>${category.name}</option>
            `
        })
        $('#idCate').innerHTML = text;
    })
}

$('.modal i').addEventListener("click", ()=>{
    $('.modal').style.display = "none";
})

function updateProduct(id) {
    editProductId = id;
    $('.modal').style.display = "block";
    const nameProduct = document.querySelector('input[name="nameEdit"]');
    const priceProduct = document.querySelector('input[name="priceEdit"]');

    nameProduct.value = nameProducts[id];
    priceProduct.value = priceProducts[id];
    showCategory(cateProducts[id])
    
}

btnUpdate.addEventListener("click", handleUpdate);
function handleUpdate(e){
    e.preventDefault();

    const nameProduct = document.querySelector('input[name="nameEdit"]');
    const priceProduct = document.querySelector('input[name="priceEdit"]');
    const cateProduct = document.querySelector('#idCate');

    let data = {
        "name" : nameProduct.value,
        "price" : priceProduct.value,
        "idCate" : Number(cateProduct.value) 
    }
    productsService.updateProduct(editProductId,data)
    .then(res => {
        $('.modal').style.display = "none";
        alert('Sửa thành công');
        console.log(`Status: ${res.status}`);
        showProducts();
    })
    .catch(error => {
        console.log(error);
    })
}

function deleteProduct(id) {
    productsService.deleteProduct(id)
    .then(res => {
        alert('Xóa thành công');
        console.log(`Status: ${res.status}`);
        showProducts();
    })
    .catch(error => {
        console.log(error);
    })
}



    