window.addEventListener("load", () => {
  if (!localStorage.getItem("userinfo")) {
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

const slideProfilbtn = document.getElementById("slideProfilbtn");
slideProfilbtn.addEventListener('click', () => {
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

const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get("id");

const products = JSON.parse(localStorage.getItem("product"));

const choiceProduct = products.filter((item) => {
  return id == item.id;
});

const detailCon = document.getElementsByClassName("detailContainer")[0];

detailCon.innerHTML = `
  <div class="detailImgCon"> 
    <img src="${choiceProduct[0].image}" class="detail-img" alt="${choiceProduct[0].title}">
  </div>
  <div class="detailText">
    <div><div class="detailTitle">${choiceProduct[0].title}</div></div>
    <div><p class="des">${choiceProduct[0].description}</p></div>
    <div class="method">
      <p class="price"> $ ${choiceProduct[0].price}</p>
      <p> <i class="fa-solid fa-star star"></i> ${choiceProduct[0].rating.rate}</p>
    </div>
    <div class="detailBtn">
      <button class="btn" id="buyBtn">Buy Now</button>
      <button class="btn" id="addToCartBtn">Add to Cart</button>
    </div>
    <div>
    <h4 class="headReview">Review</h4>
    <p>${choiceProduct[0].description}</p>
    </div>
  </div>
`;

const addToCartBtn = document.getElementById("addToCartBtn");
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

addToCartBtn.addEventListener("click", function () {
  let count = parseInt(cartCount.textContent);
  count++;

  updateCartCount(count);

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.push(choiceProduct[0]);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  alert(`${count} new item has been added to your cart`);

  const goToCart = confirm("Do you want to go to your cart?");
  if (goToCart) {
    window.location.href = "cart.html";
  }
});

const buyBtn = document.getElementById("buyBtn");
const modal = document.getElementById("orderSummaryModal");
const span = document.getElementsByClassName("close")[0];
const subtotalElem = document.getElementById("subtotal");
const shippingFeeElem = document.getElementById("shippingFee");
const discountElem = document.getElementById("discount");
const totalPriceElem = document.getElementById("totalPrice");

const SHIPPING_FEE = 10.00;
const DISCOUNT = 5.00;

if (buyBtn && modal && span) {
  buyBtn.addEventListener("click", () => {
    const subtotal = choiceProduct[0].price;
    const totalPrice = subtotal + SHIPPING_FEE - DISCOUNT;
    subtotalElem.textContent = "$" + subtotal.toFixed(2);
    shippingFeeElem.textContent = "$" + SHIPPING_FEE.toFixed(2);
    discountElem.textContent = "$" + DISCOUNT.toFixed(2);
    totalPriceElem.textContent = "$" + totalPrice.toFixed(2);

    modal.style.display = "flex";
  });

  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}




const placeOrderBtn = document.getElementById("placeOrderBtn");
placeOrderBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let isChecked = false;

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    alert("Please select a checkbox");
  } else {
    let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
    purchasedItems.push(choiceProduct[0]);
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));

    

    // Redirect to delivery information page
    window.location.href = "deliveryinformation.html";

    updatePurchaseHistoryModal();
  }
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

  //Slide Menu
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
