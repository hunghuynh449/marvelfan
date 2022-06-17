function toast({
    title = '', 
    message= '', 
    type = 'info', 
    duration = 3000
}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
        };
        const autoRemove = setTimeout(function() {
            main.removeChild(toast);
        },duration)
        const icon = icons[type];
        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);   
                clearTimeout(autoRemove);
            }
        }
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s 2s forwards`;
        toast.innerHTML = 
        `<div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fas fa-times"></i>
        </div>`;
        main.appendChild(toast);
    }
}

function showSuccessToast() {
    toast({
        title: 'Thêm thành công',
        message: 'Bạn vừa thêm đơn hàng mới !',
        type: 'success',
        duration: 3000
    })
}

function showErrorToast() {
    toast({
        title: 'Thêm thất bại',
        message: 'Vui lòng đăng nhập để đặt hàng !',
        type: 'error',
        duration: 3000
    })
}
function showDeleteToast() {
    toast({
        title: 'Xóa thành công',
        message: 'Bạn vừa xóa một sản phẩm !',
        type: 'success',
        duration: 3000
    })
}

function showLogOutToast() {
    toast({
        title: 'Đăng xuất thành công',
        message: 'Bạn vừa đăng xuất !',
        type: 'success',
        duration: 3000
    })
}

function showLogInToast() {
    toast({
        title: 'Đăng nhập thành công',
        message: 'Bạn vừa đăng nhập !',
        type: 'success',
        duration: 3000
    })
}