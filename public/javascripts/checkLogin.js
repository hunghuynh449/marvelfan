let role = localStorage.getItem('role')
if(role == 1){
    console.log('Đã đăng nhập admin');
} else{
    window.open('http://localhost:3000/', '_self')
}