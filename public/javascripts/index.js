const menu = document.querySelector('#menu');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('nav-toggle');
}

onloadCartNumbers()
function onloadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart').setAttribute('class', 'cart red')
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

checkLog()
function checkLog(){
    let isLogTag = document.querySelector('#isLogTag');
    const isLog = localStorage.getItem('isLog') ? JSON.parse(localStorage.getItem('isLog')) : false;
    if(isLog == true) {
        isLogTag.innerHTML = 'Đăng xuất';
        isLogTag.href = '/';
        isLogTag.setAttribute('onclick', 'logOut()');
    }
}

function logOut(e){
    localStorage.removeItem('isLog');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');
    localStorage.removeItem('role');
}