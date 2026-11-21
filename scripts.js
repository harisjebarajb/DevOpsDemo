
"use strict";

// ==========================================
// 1. FOOD DATA
// ==========================================

const foods = [
    {
        id: 1,
        name: "Classic Cheese Burger",
        category: "Burger",
        price: 199,
        rating: "⭐ 4.8",
        description: "Juicy burger with fresh vegetables and cheese.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },
    {
        id: 2,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 299,
        rating: "⭐ 4.9",
        description: "Classic Italian pizza with cheese and tomato.",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        price: 249,
        rating: "⭐ 4.9",
        description: "Authentic aromatic biryani with spices.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=600"
    },
    {
        id: 4,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 149,
        rating: "⭐ 4.7",
        description: "Rich chocolate cake with creamy frosting.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
    },
    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 349,
        rating: "⭐ 4.8",
        description: "Delicious pizza loaded with toppings.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600"
    },
    {
        id: 6,
        name: "Cold Coffee",
        category: "Drinks",
        price: 99,
        rating: "⭐ 4.6",
        description: "Chilled coffee with creamy milk.",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600"
    },
    {
        id: 7,
        name: "Double Cheese Burger",
        category: "Burger",
        price: 249,
        rating: "⭐ 4.9",
        description: "Double cheese and double deliciousness.",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600"
    },
    {
        id: 8,
        name: "Gulab Jamun",
        category: "Dessert",
        price: 89,
        rating: "⭐ 4.8",
        description: "Traditional Indian sweet soaked in syrup.",
        image: "https://images.unsplash.com/photo-1666190092159-4a4e4d5d0c7e?w=600"
    },
    {
        id: 9,
        name: "Mango Juice",
        category: "Drinks",
        price: 79,
        rating: "⭐ 4.7",
        description: "Fresh and refreshing mango juice.",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
    }
];


// ==========================================
// 2. APPLICATION VARIABLES
// ==========================================

let cart = [];
let selectedCategory = "All";


// ==========================================
// 3. START WEBSITE AFTER HTML LOADS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("FoodieHub JavaScript loaded successfully!");

    // Find HTML elements

    const foodContainer = document.getElementById("food-container");
    const searchInput = document.getElementById("search-input");
    const categories = document.getElementById("categories");

    const cartPanel = document.getElementById("cart-panel");
    const cartOverlay = document.getElementById("cart-overlay");

    const openCartButton = document.getElementById("open-cart");
    const closeCartButton = document.getElementById("close-cart");
    const checkoutButton = document.getElementById("checkout-button");

    // Check HTML elements

    if (
        !foodContainer ||
        !searchInput ||
        !categories ||
        !cartPanel ||
        !cartOverlay ||
        !openCartButton ||
        !closeCartButton ||
        !checkoutButton
    ) {
        console.error("FoodieHub error: One or more HTML elements are missing.");
        return;
    }


    // ======================================
    // 4. DISPLAY FOOD ITEMS
    // ======================================

    function displayFoods(items) {

        if (items.length === 0) {

            foodContainer.innerHTML = `
                <p class="no-results">
                    No food found. Try another search!
                </p>
            `;

            return;
        }

        foodContainer.innerHTML = items.map(food => `

            <article class="food-card">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    loading="lazy"
                >

                <div class="food-info">

                    <h3>${food.name}</h3>

                    <p class="food-description">
                        ${food.description}
                    </p>

                    <p class="food-rating">
                        ${food.rating}
                    </p>

                    <div class="food-bottom">

                        <span class="food-price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-button"
                            data-food-id="${food.id}"
                        >
                            + Add
                        </button>

                    </div>

                </div>

            </article>

        `).join("");

    }


    // ======================================
    // 5. FILTER FOOD ITEMS
    // ======================================

    function filterFoods() {

        const searchText = searchInput.value.toLowerCase().trim();

        const filteredFoods = foods.filter(food => {

            const matchesCategory =
                selectedCategory === "All" ||
                food.category === selectedCategory;

            const matchesSearch =
                food.name.toLowerCase().includes(searchText) ||
                food.category.toLowerCase().includes(searchText);

            return matchesCategory && matchesSearch;

        });

        displayFoods(filteredFoods);

    }


    // ======================================
    // 6. CATEGORY BUTTON EVENTS
    // ======================================

    categories.addEventListener("click", function (event) {

        const button = event.target.closest(".category");

        if (!button) return;

        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterFoods();

    });


    // ======================================
    // 7. FOOD SEARCH
    // ======================================

    searchInput.addEventListener("input", function () {

        filterFoods();

    });


    // ======================================
    // 8. ADD FOOD TO CART
    // ======================================

    foodContainer.addEventListener("click", function (event) {

        const button = event.target.closest(".add-button");

        if (!button) return;

        const foodId = Number(button.dataset.foodId);

        const food = foods.find(item => item.id === foodId);

        if (!food) return;

        const existingItem = cart.find(item => item.id === foodId);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                ...food,
                quantity: 1
            });

        }

        updateCart();

        button.textContent = "✓ Added";

        setTimeout(() => {
            button.textContent = "+ Add";
        }, 700);

    });


    // ======================================
    // 9. UPDATE SHOPPING CART
    // ======================================

    function updateCart() {

        const cartItems = document.getElementById("cart-items");

        const cartCount = document.getElementById("cart-count");

        const cartTotal = document.getElementById("cart-total");

        let total = 0;

        let count = 0;

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    Your cart is empty.
                </p>
            `;

        } else {

            cartItems.innerHTML = cart.map(item => {

                total += item.price * item.quantity;

                count += item.quantity;

                return `

                    <div class="cart-item">

                        <div>

                            <h4>${item.name}</h4>

                            <p>
                                ₹${item.price * item.quantity}
                            </p>

                        </div>

                        <div class="quantity-controls">

                            <button
                                class="quantity-button"
                                data-id="${item.id}"
                                data-change="-1"
                                aria-label="Decrease quantity"
                            >−</button>

                            <span>${item.quantity}</span>

                            <button
                                class="quantity-button"
                                data-id="${item.id}"
                                data-change="1"
                                aria-label="Increase quantity"
                            >+</button>

                        </div>

                    </div>

                `;

            }).join("");

        }

        cartCount.textContent = count;

        cartTotal.textContent = "₹" + total;

    }


    // ======================================
    // 10. CHANGE FOOD QUANTITY
    // ======================================

    document.getElementById("cart-items")
        .addEventListener("click", function (event) {

            const button = event.target.closest(".quantity-button");

            if (!button) return;

            const foodId = Number(button.dataset.id);

            const change = Number(button.dataset.change);

            const item = cart.find(food => food.id === foodId);

            if (!item) return;

            item.quantity += change;

            if (item.quantity <= 0) {

                cart = cart.filter(food => food.id !== foodId);

            }

            updateCart();

        });


    // ======================================
    // 11. OPEN CART
    // ======================================

    function openCart() {

        cartPanel.classList.add("open");

        cartOverlay.classList.add("show");

    }


    // ======================================
    // 12. CLOSE CART
    // ======================================

    function closeCart() {

        cartPanel.classList.remove("open");

        cartOverlay.classList.remove("show");

    }


    openCartButton.addEventListener("click", openCart);

    closeCartButton.addEventListener("click", closeCart);

    cartOverlay.addEventListener("click", closeCart);


    // ======================================
    // 13. CHECKOUT
    // ======================================

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty! Please add some food.");

            return;

        }

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        alert(
            "Thank you for choosing FoodieHub!\n\n" +
            "Your order total is ₹" + total + "\n\n" +
            "This is a demo checkout. No payment was processed."
        );

        cart = [];

        updateCart();

        closeCart();

    });


    // ======================================
    // 14. INITIALIZE WEBSITE
    // ======================================

    displayFoods(foods);

    updateCart();

});
