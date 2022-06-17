const API = "https://62ac33ce9fa81d00a7abec9f.mockapi.io/api/v1/users";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$("#loginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  let email = document.querySelector("#email_account").value;
  let pass = document.querySelector("#pass_account").value;
  fetch(API)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let checkAccount = false;
      data.map((item) => {
        if (item.email == email && item.password == pass) {
          checkAccount = true;
          const loadDiv = document.querySelector(".loading-box");
          loadDiv.style.display = "block";
          localStorage.setItem("isLog", true);
          localStorage.setItem("email", email);
          localStorage.setItem("password", pass);
          localStorage.setItem("phone", item.phone);
          localStorage.setItem("address", item.address);
          localStorage.setItem("role", item.role);
        }
      });
      if (checkAccount === true) {
        document.querySelector("#error").innerHTML = "";
        document.querySelector("#success").innerHTML = "Đăng nhập thành công";
        setTimeout(() => {
          window.open("http://localhost:3000/", "_self");
        }, 1500);
      } else {
        document.querySelector("#error").innerHTML = "Sai email hoặc mật khẩu";
      }
    });
});
