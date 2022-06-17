const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let products = [];
let cart = [];
let category = "";

const productsService = new Products();
const categoryService = new Category();

// const boxContainer = document.querySelector(".box-container");

window.onload = showProducts();
window.onload = showCategory();

function showCategory(){
    categoryService.getAll()
    .then(res => {
        if($('#filter')){
            let text = `<option value="" selected>Tất cả</option>`
            res.forEach(category => {
                text += `
                    <option value="${category.id}">${category.name}</option>
                `
            })
            $('#filter').innerHTML = text;
        }
    })
}

function showProducts() {
    productsService.getAll()
    .then(res => {
        products = res;
        if ($('.box-container')) {
            let text = '';
            products.forEach(product => {
                text += `
                <div class="box">
                    <h3>${product.name}</h3>
                    <img src="${product.urlImg}" alt="">
                    <div class="price">${product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                    <a href="#" class="btn add-cart" onclick="showSuccessToast();">Thêm vào giỏ hàng</a>
                </div>
            `
            })
            $('.box-container').innerHTML = text;
        }
    })
    .then(res => {
        addCart();
    });
}

function productFilter(value) {
    category = value;
    const loadDiv = document.querySelector('.loading-box');
    if (value == "") {
        loadDiv.style.display = 'block';
        setTimeout(() => {
            showProducts()
            loadDiv.style.display = 'none';
        }, 500)
        return;
    }
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        //parse json from db.json
        const data = JSON.parse(this.responseText);
        //get products from data
        let productsFilter = data.products;
        //filter products with idCate = value in select
        // listProducts is new array
        let listProducts = productsFilter.filter(item => {
            return item.idCate == value;
        })
        //add product to array products at line 3
        products = listProducts;
        //load new data to browser
        let text = '';
        listProducts.forEach(product => {
            text += `
                <div class="box">
                    <h3>${product.name}</h3>
                    <img src="${product.urlImg}" alt="">
                    <div class="price">${product.price.toLocaleString('vi', {style: 'currency', currency: 'VND'})}</div>
                    <a href="#" class="btn add-cart" onclick="showSuccessToast();">Thêm vào giỏ hàng</a>
                </div>
            `
        })
        loadDiv.style.display = 'block';
        $('.box-container').innerHTML = text;
        loadDiv.style.display = 'none';
        searchProduct()
        addCart();
        // console.log(products);
    }
    xhttp.open("GET", "database/db.json");
    xhttp.send();
}


function addCart(){
    let carts = document.querySelectorAll('.add-cart');
    for(let i = 0; i < carts.length; i++){
        carts[i].addEventListener('click', (e) => {
            e.preventDefault();
            // console.log(products[i]);
            cartNumber(products[i]);
            // totalCost(products[i]);
        })
    }
}

function cartNumber(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    let total = 1;

    if(cartItems){
        cartItems.forEach((item) => {
            total += item.inCart;
        })
        document.querySelector('.numberCart').textContent = total;
        document.querySelector('.cart').setAttribute('class', 'cart red')
        localStorage.setItem("cartNumbers", total)
    } else {
        document.querySelector('.numberCart').textContent = 1;
        document.querySelector('.cart').setAttribute('class', 'cart red')
    }
    if(product){
        setItem(product);
    }
}

function updateCartNumber(){
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    let total = 0;

    if(cartItems){
        if(cartItems.length == 0){
            document.querySelector('.cart').setAttribute('class', 'cart')
            document.querySelector('.numberCart').textContent = "";
            localStorage.removeItem("cartNumbers");
            localStorage.removeItem("productsIncart");
            localStorage.removeItem("totalCost");
            return
        }
        cartItems.forEach((item) => {
            total += item.inCart;
        })
        document.querySelector('.numberCart').textContent = total;
        localStorage.setItem("cartNumbers", total)
    } else {
        document.querySelector('.numberCart').textContent = 1;
    }
}

function minusCartItem(id){
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    cartItems.forEach((item) => {
        if(item.id == id){
            if(item.inCart > 1) {
                item.inCart--;
            }
        }
    })
    localStorage.setItem('productsIncart', JSON.stringify(cartItems));
    totalCost();
    updateCartNumber();
    displayCart();
}

function plusCartItem(id){
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    cartItems.forEach((item) => {
        if(item.id == id){
            item.inCart++;
        }
    })
    localStorage.setItem('productsIncart', JSON.stringify(cartItems));
    totalCost();
    updateCartNumber();
    displayCart();
}

function setItem(product){
    let item;
    let cartItems = localStorage.getItem('productsIncart') ? JSON.parse(localStorage.getItem('productsIncart')) : [];
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].id == product.id){
            item = cartItems[i]
        }
    }
    if(item != null){
        item.inCart++;
    } else {
        product.inCart = 1;
        cartItems.push(product);
    }
    localStorage.setItem('productsIncart', JSON.stringify(cartItems));
    totalCost();
}

function totalCost(){
    let total = 0;
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        cartItems.forEach((item) => {
            total += item.inCart * item.price;
        })

        localStorage.setItem("totalCost", total)
    }
}

displayCart();
function displayCart(){
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    let productContainer = document.querySelector('.products');
    if(productContainer){
        productContainer.innerHTML = '';
    }
    if(cartItems && productContainer){
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="fas fa-times-circle" onclick="removeCart(${item.id})"></i>
                <img src="${item.urlImg}">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price.toLocaleString('vi', {style: 'currency', currency: 'VND'})}</div>
            <div class="quantity">
                <ion-icon name="remove-circle-outline" onclick="minusCartItem(${item.id})"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="add-circle-outline" onclick="plusCartItem(${item.id})"></ion-icon>
            </div>
            <div class="total">${(item.price * item.inCart).toLocaleString('vi', {style: 'currency', currency: 'VND'})}</div>
            `
        })
        if(cartCost > 0){
            productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <h1 class="basketTotalTitle">Thành tiền</h1>
                    <h1 class="basketTotal">${cartCost.toLocaleString('vi', {style: 'currency', currency: 'VND'})}</h1>
                </div>
            `
        }
    }
}

function removeCart(id){
    showDeleteToast();
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    cartItems.forEach((item, index) => {
        if(item.id == id){
            itemRemove = cartItems.splice(index, 1);
        }
    })
    
    localStorage.setItem('productsIncart', JSON.stringify(cartItems));
    totalCost();
    updateCartNumber();
    displayCart();
}


let searchValue = $('#searchValue')
searchValue.addEventListener('keyup', searchProduct)

function searchProduct() {
    productsService.getAll()
    .then((data) => {
        if (category == "") {
            var re = new RegExp(searchValue.value +'.+$', 'i');
            patients = data.filter(function (e, i, a) {
                return e.name.search(re) != -1;
            })
            products = patients
            if ($('.box-container')) {
                let text = '';
                products.forEach(product => {
                    text += `
                    <div class="box">
                        <h3>${product.name}</h3>
                        <img src="${product.urlImg}" alt="">
                        <div class="price">${product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        <a href="#" class="btn add-cart" onclick="showSuccessToast();">Thêm vào giỏ hàng</a>
                    </div>
                `
                })
                $('.box-container').innerHTML = text;
            }
        } else {
            listProduct = data.filter(function (e, i, a) {
                return e.idCate == category;
            })
            var re = new RegExp(searchValue.value +'.+$', 'i');
            patients = listProduct.filter(function (e, i, a) {
                return e.name.search(re) != -1;
            })
            products = patients
            if ($('.box-container')) {
                let text = '';
                products.forEach(product => {
                    text += `
                    <div class="box">
                        <h3>${product.name}</h3>
                        <img src="${product.urlImg}" alt="">
                        <div class="price">${product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
                        <a href="#" class="btn add-cart" onclick="showSuccessToast();">Thêm vào giỏ hàng</a>
                    </div>
                `
                })
                $('.box-container').innerHTML = text;
            }
        }
        addCart();
    })
}

