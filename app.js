// =====================================
// UDAN MART - PRODUCT & CART SYSTEM
// =====================================

const products = [
    {
        id: 1,
        name: "Basmati Rice",
        category: "Grocery",
        price: 80,
        unit: "1 kg",
        emoji: "🍚"
    },
    {
        id: 2,
        name: "Wheat Atta",
        category: "Grocery",
        price: 45,
        unit: "1 kg",
        emoji: "🌾"
    },
    {
        id: 3,
        name: "Cooking Oil",
        category: "Grocery",
        price: 145,
        unit: "1 litre",
        emoji: "🫙"
    },
    {
        id: 4,
        name: "Fresh Potatoes",
        category: "Vegetables",
        price: 30,
        unit: "1 kg",
        emoji: "🥔"
    },
    {
        id: 5,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 35,
        unit: "1 kg",
        emoji: "🍅"
    },
    {
        id: 6,
        name: "Green Spinach",
        category: "Vegetables",
        price: 20,
        unit: "1 bunch",
        emoji: "🥬"
    },
    {
        id: 7,
        name: "Fresh Milk",
        category: "Dairy",
        price: 32,
        unit: "500 ml",
        emoji: "🥛"
    },
    {
        id: 8,
        name: "Fresh Curd",
        category: "Dairy",
        price: 40,
        unit: "400 g",
        emoji: "🥣"
    },
    {
        id: 9,
        name: "Butter Biscuits",
        category: "Snacks",
        price: 25,
        unit: "Pack",
        emoji: "🍪"
    },
    {
        id: 10,
        name: "Potato Chips",
        category: "Snacks",
        price: 20,
        unit: "Pack",
        emoji: "🍟"
    },
    {
        id: 11,
        name: "Farm Eggs",
        category: "Dairy",
        price: 72,
        unit: "6 pieces",
        emoji: "🥚"
    },
    {
        id: 12,
        name: "Sugar",
        category: "Grocery",
        price: 44,
        unit: "1 kg",
        emoji: "🧂"
    }
];

let cart = [];
let selectedCategory = "All";


// FORMAT PRICE
function formatPrice(price) {
    return "₹" + price;
}


// DISPLAY PRODUCTS
function displayProducts(list = products) {

    const productList = document.getElementById("product-list");

    if (!productList) {
        return;
    }

    if (list.length === 0) {
        productList.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    productList.innerHTML = list.map(product => {

        return `
            <article class="product-card">

                <div class="product-image">
                    ${product.emoji}
                </div>

                <div class="product-info">

                    <p>${product.category} · ${product.unit}</p>

                    <h3>${product.name}</h3>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${formatPrice(product.price)}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${product.id})">

                            + Add

                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}


// ADD PRODUCT TO CART
function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    alert(product.name + " added to cart!");
}


// UPDATE CART COUNT AND TOTAL
function updateCart() {

    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        return;
    }

    cartItems.innerHTML = cart.map(item => {

        return `
            <div class="cart-item">

                <span>${item.emoji}</span>

                <div>
                    <strong>${item.name}</strong>

                    <p>
                        ${formatPrice(item.price)}
                        × ${item.quantity}
                    </p>
                </div>

                <button
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>
        `;

    }).join("");
}


// REMOVE PRODUCT FROM CART
function removeFromCart(productId) {

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (!existingProduct) {
        return;
    }

    existingProduct.quantity--;

    if (existingProduct.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }

    updateCart();
}


// OPEN CART
function openCart() {

    const overlay = document.getElementById("cart-overlay");

    if (overlay) {
        overlay.classList.add("open");
    }

    updateCart();
}


// CLOSE CART
function closeCart() {

    const overlay = document.getElementById("cart-overlay");

    if (overlay) {
        overlay.classList.remove("open");
    }
}


// FILTER PRODUCTS BY CATEGORY
function filterProducts(category) {

    selectedCategory = category;

    const filteredProducts =
        category === "All"
            ? products
            : products.filter(
                product => product.category === category
            );

    displayProducts(filteredProducts);

    document.getElementById("products")?.scrollIntoView({
        behavior: "smooth"
    });
}


// SEARCH PRODUCTS
function searchProducts() {

    const searchInput =
        document.getElementById("search-input");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    displayProducts(filteredProducts);
}


// CHECKOUT PLACEHOLDER
function checkout() {

    if (cart.length === 0) {

        alert("Please add products to your cart first.");

        return;
    }

    alert(
        "Your cart is ready! Login, delivery address and " +
        "database connection will be added in the next phase."
    );
}


// CURRENT YEAR
const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// LOAD PRODUCTS WHEN PAGE OPENS
displayProducts();

updateCart();
