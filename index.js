const menuToggle = document.querySelector(
    ".menu-toggle, .hamburger, #menu-toggle"
);

const navigation = document.querySelector(
    ".nav-links, .navbar-nav, #nav-links"
);

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("active");

        const isExpanded =
            navigation.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isExpanded)
        );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================
   2. CONTACT FORM — WHATSAPP
========================================= */

const contactForm = document.getElementById(
    "luxora-message-form"
);

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameField =
            document.getElementById("customer-name");

        const emailField =
            document.getElementById("customer-email");

        const enquiryField =
            document.getElementById("enquiry-type");

        const messageField =
            document.getElementById("customer-message");

        if (
            !nameField ||
            !emailField ||
            !enquiryField ||
            !messageField
        ) {
            alert("Please check the contact form fields.");
            return;
        }

        const customerName = nameField.value.trim();
        const customerEmail = emailField.value.trim();
        const enquiryType = enquiryField.value;
        const customerMessage = messageField.value.trim();

        if (
            !customerName ||
            !customerEmail ||
            !enquiryType ||
            !customerMessage
        ) {
            alert("Please complete all the fields.");
            return;
        }

        const message =
            "Hello Luxora Jewellery!\n\n" +
            "Name: " + customerName + "\n" +
            "Email: " + customerEmail + "\n" +
            "Enquiry: " + enquiryType + "\n\n" +
            "Message: " + customerMessage;

        const whatsappURL =
            "https://wa.me/2348124339997?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");
    });
}


/* =========================================
   3. PRODUCT SEARCH
========================================= */

const productSearch = document.getElementById(
    "product-search"
);

const productItems = document.querySelectorAll(
    ".product-card, .product-item"
);

if (productSearch && productItems.length > 0) {
    productSearch.addEventListener("input", function () {
        const searchTerm =
            productSearch.value.toLowerCase().trim();

        productItems.forEach(function (product) {
            const productText =
                product.textContent.toLowerCase();

            product.style.display =
                productText.includes(searchTerm) ? "" : "none";
        });
    });
}


/* =========================================
   4. PRODUCT CATEGORY FILTER
========================================= */

const categoryButtons = document.querySelectorAll(
    "[data-category-filter]"
);

if (categoryButtons.length > 0 && productItems.length > 0) {
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory =
                button.dataset.categoryFilter;

            productItems.forEach(function (product) {
                const productCategory =
                    product.dataset.category;

                const matchesCategory =
                    selectedCategory === "all" ||
                    productCategory === selectedCategory;

                product.style.display =
                    matchesCategory ? "" : "none";
            });

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");
        });
    });
}


/* =========================================
   5. SHOPPING CART
========================================= */

let luxoraCart = [];

const cartCount = document.getElementById("cart-count");

const cartContainer = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

function updateCart() {
    if (cartCount) {
        cartCount.textContent = luxoraCart.reduce(
            function (total, item) {
                return total + item.quantity;
            },
            0
        );
    }

    if (cartContainer) {
        cartContainer.replaceChildren();

        if (luxoraCart.length === 0) {
            cartContainer.textContent = "Your cart is empty.";
        }

        luxoraCart.forEach(function (item, index) {
            const itemRow = document.createElement("div");

            const itemName = document.createElement("span");
            itemName.textContent =
                item.name + " × " + item.quantity;

            const itemPrice = document.createElement("span");
            itemPrice.textContent =
                "₦" +
                (item.price * item.quantity).toLocaleString(
                    "en-NG"
                );

            const removeButton =
                document.createElement("button");

            removeButton.type = "button";
            removeButton.textContent = "Remove";

            removeButton.addEventListener("click", function () {
                luxoraCart.splice(index, 1);
                updateCart();
            });

            itemRow.append(
                itemName,
                document.createTextNode(" — "),
                itemPrice,
                document.createTextNode(" "),
                removeButton
            );

            cartContainer.appendChild(itemRow);
        });
    }

    if (cartTotal) {
        const total = luxoraCart.reduce(
            function (sum, item) {
                return sum + item.price * item.quantity;
            },
            0
        );

        cartTotal.textContent =
            "₦" + total.toLocaleString("en-NG");
    }
}

document.querySelectorAll(".add-to-cart").forEach(
    function (button) {
        button.addEventListener("click", function () {
            const product =
                button.closest(".product-card, .product-item");

            if (!product) return;

            const nameElement = product.querySelector(
                ".product-name, h3, h2"
            );

            const priceElement = product.querySelector(
                ".product-price, [data-price]"
            );

            if (!nameElement || !priceElement) {
                alert("Please check this product's name and price.");
                return;
            }

            const productName =
                nameElement.textContent.trim();

            const rawPrice =
                priceElement.dataset.price ||
                priceElement.textContent;

            const productPrice = Number(
                rawPrice.replace(/[₦,\s]/g, "")
            );

            if (
                !Number.isFinite(productPrice) ||
                productPrice < 0
            ) {
                alert("Please check this product's price.");
                return;
            }

            const existingItem = luxoraCart.find(
                function (item) {
                    return item.name === productName;
                }
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                luxoraCart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCart();

            alert(productName + " added to your cart!");
        });
    }
);

updateCart();


/* =========================================
   6. NEWSLETTER FORM
========================================= */

const newsletterForm = document.getElementById(
    "newsletter-form"
);

if (newsletterForm) {
    newsletterForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const emailInput = newsletterForm.querySelector(
                'input[type="email"]'
            );

            if (!emailInput || !emailInput.value.trim()) {
                alert("Please enter your email address.");
                return;
            }

            alert(
                "Thank you for your interest in Luxora Jewellery!"
            );

            newsletterForm.reset();
        }
    );
}


/* =========================================
   7. CURRENT YEAR IN THE FOOTER
========================================= */

const yearElement = document.getElementById(
    "current-year"
);

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}