window.addEventListener("load", () => {
  if (localStorage.getItem("userinfo")) {
    return
  } else {
    window.location.href = "../html/profilesetUp.html";
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

const userName = document.getElementsByClassName("name")[0];
const userEmail = document.getElementsByClassName("email")[0];

const userInfo = JSON.parse(localStorage.getItem("userinfo"));

if (userInfo) {
  userName.textContent = userInfo.username;
  userEmail.textContent = userInfo.useremail;
}


const slideProfilbtn = document.getElementById("slideProfilbtn");
slideProfilbtn.addEventListener('click', () => {
  profilAlert.style.display = "flex";

  setTimeout(() => {
    profilAlert.style.display = "none";
  }, 3000);
});


document.addEventListener('DOMContentLoaded', function () {
  const navIcon = document.getElementsByClassName("navIcon")[0];
  const navInput = document.getElementsByClassName("navInput")[0];
  const searchBar = document.getElementById('searchBar');
  const loadTag = document.getElementById('loading');
  const productContainer = document.getElementById('productCon');

  navIcon.addEventListener("click", () => {
    navInput.style.display = "block";
  });

  loadTag.style.display = "none";

  const slidenavIcon = document.getElementById("silideNavIcon");
  const slidenavInput = document.getElementById("slideSearchBar");

  slidenavIcon.addEventListener("click", () => {
    slidenavInput.style.display = "block";
  });

  let products = [];


  window.addEventListener('load', () => {
    loadTag.style.display = "block";

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        loadTag.style.display = "none";
        if (data) {
          products = data;
          renderProducts(products);
          localStorage.setItem("product", JSON.stringify(products));
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  });

  function renderProducts(products) {
    productContainer.innerHTML = products.map(product => `
          <div class="card product">
              <div class="card-title">
                  <h5 class="card-title">${product.title}</h5>
              </div>
              <div class="card-body">
                  <img src="${product.image}" class="card-img" alt="${product.title}">
                  <div class="method">
                      <p class="card-text">$${product.price}</p>
                      <p class="card-text">${product.rating ? '<i class="fa-solid fa-star star"></i> ' + product.rating.rate : "No rating"}</p>
                  </div>
              </div>
              <div class="card-bottom">
                  <button class="detailBtn" data-id="${product.id}">Detail</button>
              </div>
          </div>
      `).join('');

    const detailBtns = document.getElementsByClassName("detailBtn");
    for (let j = 0; j < detailBtns.length; j++) {
      detailBtns[j].addEventListener("click", (event) => {
        const productId = event.target.getAttribute("data-id");
        window.location.href = `../html/detail.html?id=${productId}`;
      });
    }

  }

  function filterProducts(searchText) {
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase())
    );
    renderProducts(filteredProducts);
  }

  searchBar.addEventListener('keyup', () => {
    const searchText = searchBar.value;
    filterProducts(searchText);
  });

  slidenavInput.addEventListener('keyup', () => {
    const searchText = slidenavInput.value;
    filterProducts(searchText);
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

  const cartIcon = document.getElementById('cartIcon');

  cartIcon.addEventListener('click', function goToCartPage() {
    window.location.href = 'cart.html';
  });

  const cartCount = document.querySelector(".quantity");

  function updateCartCount(count) {
    cartCount.textContent = count;
    localStorage.setItem("cartCount", count);
  }

  function initializeCartCount() {
    const count = localStorage.getItem("cartCount");
    if (count !== null) {
      updateCartCount(parseInt(count));
    }
  }

  initializeCartCount();

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("detailBtn")) {
      const productId = event.target.getAttribute("data-id");
      window.location.href = `../html/detail.html?id=${productId}`;
    }
  });
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

