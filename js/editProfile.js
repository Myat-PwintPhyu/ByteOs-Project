const userInfo = JSON.parse(localStorage.getItem("userinfo"));


const nameinp = document.getElementsByTagName("input")[0];
const emailinp = document.getElementsByTagName("input")[1];

nameinp.value = userInfo.username;
emailinp.value = userInfo.useremail;

const btn =document.getElementsByTagName("button")[0];

btn.addEventListener ("click",(e)=>{
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailinp.value)) {
        alert("Please enter a valid email address.");
        return;
      }

    
    user.username = nameinp.value;
    user.useremail = emailinp.value;

    localStorage.setItem("userinfo", JSON.stringify(user));
    window.location.href = "../html/product.html";
})