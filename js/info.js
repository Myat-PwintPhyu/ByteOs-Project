const userForm = document.getElementById("userForm");
const saveBtn = document.getElementById("save");
const nameInp = userForm.elements[0];
const phoneInp = userForm.elements[1];
const regionInp = userForm.elements[2];
const cityInp = userForm.elements[3];
const buildInp = userForm.elements[4];
const addressInp = userForm.elements[5];

const use = {};

const handleUserData = (username, phone, region, city, build, address) => {
    use.username = username;
    use.phone = phone;
    use.region = region;
    use.city = city;
    use.build = build;
    use.address = address;

    localStorage.setItem("deliver", JSON.stringify(use));
    console.log("User info saved:", use);

    nameInp.value = '';
    phoneInp.value = '';
    regionInp.value = '';
    cityInp.value = '';
    buildInp.value = '';
    addressInp.value = '';

    
    window.location.href="../html/product.html"
};

const showAlert = (title, message) => {
    alert(`${title}\n${message}`);
  //   setTimeout(() => {
  //     alert.remove();
  // }, 3000); 
};

saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const username = nameInp.value;
    const phone = phoneInp.value;
    const region = regionInp.value;
    const city = cityInp.value;
    const build = buildInp.value;
    const address = addressInp.value;

    if (username === "" || phone === "" || region === "" || city === "" || build === "" || address === "") {
        alert("Fill all fields");
    } else {
        handleUserData(username, phone, region, city, build, address);
        window.location.href="../html/product.html"
    }
    
});

window.addEventListener("load", () => {
    if (localStorage.getItem("deliver")) {
    }
});
