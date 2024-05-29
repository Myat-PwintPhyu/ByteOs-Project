window.addEventListener("load",()=>{
    if(localStorage.getItem("userinfo")){
       return
    }else{
        window.location.href ="../html/profilesetUp.html";
    }
});

const profilAlert = document.getElementsByClassName("profilSetUp")[0];
const profilbtn = document.getElementById("profilbtn");

profilbtn.addEventListener('click', () => {
    profilAlert.style.display = "flex";
    
    setTimeout(() => {
        profilAlert.style.display = "none";
    }, 3000);
});

const slideProfilbtn = document.getElementById("slideProfilbtn");
slideProfilbtn.addEventListener('click', () => {
  profilAlert.style.display = "flex";

  setTimeout(() => {
    profilAlert.style.display = "none";
  }, 3000);
});

const userName = document.getElementsByClassName("name")[0];
const userEmail = document.getElementsByClassName("email")[0];

const userInfo = JSON.parse(localStorage.getItem("userinfo"));

if (userInfo) {
    userName.textContent = userInfo.username;
    userEmail.textContent = userInfo.useremail;
}
const logoutBtn = document.getElementsByClassName("logout")[0];
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userinfo");
    window.location.href = "../html/profilesetUp.html";
});

const slideLogout= document.getElementById("slideLogout");

slideLogout.addEventListener("click", () => {
  localStorage.removeItem("userinfo");
  window.location.href = "../html/profilesetUp.html";
});

const menClothes = document.getElementsByClassName("MC")[0];
const womenClothes = document.getElementsByClassName("WC")[0];
const electronics = document.getElementsByClassName("EC")[0];
const jewelery = document.getElementsByClassName("JE")[0];

menClothes.addEventListener("click", () => {
    window.location.href = "../html/category.html?category=men's clothing";
});

womenClothes.addEventListener("click", () => {
    window.location.href = "../html/category.html?category=women's clothing";
});

electronics.addEventListener("click", () => {
    window.location.href = "../html/category.html?category=electronics";
});

jewelery.addEventListener("click", () => {
    window.location.href = "../html/category.html?category=jewelery";
});

const menClothes2 = document.getElementsByClassName("MC2")[0];
  const womenClothes2 = document.getElementsByClassName("WC2")[0];
  const electronics2 = document.getElementsByClassName("EC2")[0];
  const jewelery2 = document.getElementsByClassName("JE2")[0];

  menClothes2.addEventListener("click", () => {
      window.location.href = "../html/category.html?category=men's clothing";
  });

  womenClothes2.addEventListener("click", () => {
      window.location.href = "../html/category.html?category=women's clothing";
  });

  electronics2.addEventListener("click", () => {
      window.location.href = "../html/category.html?category=electronics";
  });

  jewelery2.addEventListener("click", () => {
      window.location.href = "../html/category.html?category=jewelery";
  });

document.addEventListener("DOMContentLoaded", function () {
    // Get Count From LocalStorage
    const cartCount = localStorage.getItem("cartCount") || 0;

    // Update Count
    const quantitySpan = document.querySelector(".quantity");
    quantitySpan.textContent = cartCount;
});


document.addEventListener("DOMContentLoaded", () => {
    const loadTag = document.getElementById("loading");
    const productContainer = document.getElementById("productCon");

    loadTag.style.display = "none";

    window.addEventListener("load", () => {
        loadTag.style.display = "block";

        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                loadTag.style.display = "none";
                const products = data;
                const urlParams = new URLSearchParams(window.location.search);
                const category = urlParams.get('category');
                
                if (category) {
                    filterProducts(category, products);
                }

                const JSONProduct = JSON.stringify(products);
                localStorage.setItem("product", JSONProduct);
            })
            .catch((error) => {
                loadTag.style.display = "none";
                console.error('Error fetching data:', error);
            });
    });

    function filterProducts(category, products) {
        productContainer.innerHTML = "";

        const choiceProduct = products.filter((item) => item.category === category);

        for (let i = 0; i < choiceProduct.length; i++) {
            const product = choiceProduct[i];
            const cardHTML = `
                <div class="card">
                    <div class="card-title">
                        <h5 class="card-title">${product.title}</h5>
                    </div>
                    <div class="card-body">
                        <img src="${product.image}" class="card-img" alt="${product.title}">
                        <div class="method">
                            <p class="card-text">$ ${product.price}</p>
                            <p class="card-text">${product.rating ? '<i class="fa-solid fa-star star"></i> ' + product.rating.rate : 'No rating'}</p>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <button class="detailBtn" data-id="${product.id}">Detail</button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += cardHTML;
        }
        const detailBtns = document.getElementsByClassName("detailBtn");
        for (let j = 0; j < detailBtns.length; j++) {
          detailBtns[j].addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            window.location.href = `../html/detail.html?id=${productId}`;
          });
        }
    }

   
});

const cartIcon = document.getElementById('cartIcon');

cartIcon.addEventListener('click', function() {
  window.location.href = 'cart.html';
});

document.addEventListener('DOMContentLoaded', function () {
  const purchaseHistoryModal = document.getElementById('purchaseHistoryModal');
  const purchaseHistoryLink = document.getElementById('purchaseHistoryLink');
  const purchaseHistoryLink2 = document.getElementById('purchaseHistoryLink2');
  const closeButtons = document.getElementsByClassName('close');

  purchaseHistoryLink.onclick = function () {
    purchaseHistoryModal.style.display = "block";
    updatePurchaseHistoryModal();
  }

  purchaseHistoryLink2.onclick = function () {
    purchaseHistoryModal.style.display = "block";
    updatePurchaseHistoryModal();
  }

  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
      closeButtons[i].parentElement.parentElement.style.display = "none";
    }
  }

  window.onclick = function (event) {
    if (event.target == purchaseHistoryModal) {
      purchaseHistoryModal.style.display = "none";
    }
  }

  function updatePurchaseHistoryModal() {
    const purchaseHistoryContent = document.getElementById('purchaseHistoryContent');
    let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
    if (purchasedItems.length === 0) {
      purchaseHistoryContent.innerHTML = '<p>No purchase history available.</p>';
    } else {
      let content = '';
      for (let i = 0; i < purchasedItems.length; i++) {
        content += `
          <div class="purchase-item-container" data-index="${i}">
            <div>
              <i class="fa-solid fa-trash trash-icon" id="trash"></i>
            </div>
            <div class="purchase-item">
              <img src="${purchasedItems[i].image}" alt="${purchasedItems[i].title}" class="purchase-img">
              <div class="purchase-details">
                <h4>${purchasedItems[i].title}</h4>
                <p>Price: $${purchasedItems[i].price}</p>
                <p>Rating: ${purchasedItems[i].rating.rate} <i class="fa-solid fa-star star"></i></p>
              </div>
            </div>
          </div>
        `;
      }
      purchaseHistoryContent.innerHTML = content;

      const trashIcons = document.getElementsByClassName('trash-icon');
      for (let i = 0; i < trashIcons.length; i++) {
        trashIcons[i].onclick = function () {
          const itemContainer = trashIcons[i].closest('.purchase-item-container');
          const index = itemContainer.getAttribute('data-index');
          removeItemFromPurchaseHistory(index);
        }
      }
    }
  }

  function removeItemFromPurchaseHistory(index) {
  let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
  purchasedItems = purchasedItems.filter((item, i) => i !== parseInt(index));
  localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  updatePurchaseHistoryModal();
}

  // Slide Menu
  const navbarToggle = document.getElementById("navToggle");
  const navbarOffcanvas = document.getElementsByClassName("menu-offcanvas")[0];
  const navbarOffcanvasClose = document.getElementById("menu-offcanvas-close");

  navbarToggle.addEventListener("click", () => {
    navbarOffcanvas.style.display = "block";
  });

  navbarOffcanvasClose.addEventListener("click", () => {
    navbarOffcanvas.style.display = "none";
  });


});
  