const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const categoryService = new Category();
const btnDelete = document.querySelector('.btnDelete');
const btnAdd = document.querySelector('.btnAdd');
const btnUpdate = document.querySelector('.btnUpdate');
let listCategories = [];
let editCategoryId;
window.onload = showCategory();

function showCategory() {
    categoryService.getAll()
    .then(res => {
        // console.log(res);
        let text = '';
        res.forEach(category => {
            text += `
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>
                    <button class="btnEdit" onclick="updateCate(${category.id})">Sửa</button>
                    <button class="btnDelete" onclick="deleteCate(${category.id})">Xóa</button>
                </td>
            </tr>
            `
            listCategories[category.id] = category.name;
        })
        $('#listCategory').innerHTML = text;
    })
}

$('.modal i').addEventListener("click", ()=>{
    $('.modal').style.display = "none";
})

function updateCate(id) {
    editCategoryId = id;
    $('.modal').style.display = "block";
    const showNameCate = document.querySelector('input[name="nameEdit"]');
    showNameCate.value = listCategories[id];
}

btnUpdate.addEventListener("click", handleUpdate);
function handleUpdate(){
    const showNameCate = document.querySelector('input[name="nameEdit"]');
    console.log(showNameCate.value);
    let data = {
        "name" : showNameCate.value
    }
    categoryService.updateCategory(editCategoryId,data)
    .then(res => {
        $('.modal').style.display = "none";
        alert('Sửa thành công');
        console.log(`Status: ${res.status}`);
        showCategory();
    })
    .catch(error => {
        console.log(error);
    })
}


btnAdd.addEventListener("click", addCate);
function addCate() {
    let name = $('#nameCategory').value;
    let data = {"name" : name};

    if(!name) {
        return alert('Chưa nhập dữ liệu thêm');
    }
    categoryService.addCategory(data)
    .then(res => {
        alert('Thêm thành công');
        console.log(`Status: ${res.status}`);
        showCategory();
    })
    .catch(error => {
        console.log(error);
    })
}

function deleteCate(id) {
    categoryService.deleteCategory(id)
    .then(res => {
        alert('Xóa thành công');
        console.log(`Status: ${res.status}`);
        showCategory();
    })
    .catch(error => {
        console.log(error);
    })
}



    