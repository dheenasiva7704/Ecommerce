let products = [];

async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products);
        updateCartCount();
    } catch (error) {
        console.error('Failed to load products:', error);
        const container = document.getElementById('productContainer');
        if (container) {
            container.innerHTML = '<div class="col-12 text-center text-danger">Unable to load products. Please refresh the page.</div>';
        }
    }
}

function displayProducts(data) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="col-12 text-center">No products available at the moment.</div>';
        return;
    }

    data.forEach((product) => {
        container.innerHTML += `
        <div class="col-sm-6 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                    <h6 class="product-title mb-2">${product.title}</h6>
                    <p class="text-muted text-capitalize mb-2">${product.category}</p>
                    <div class="mb-3"><strong>$${product.price.toFixed(2)}</strong></div>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${product.id})">Add To Cart</button>
                </div>
            </div>
        </div>`;
    });
}

function filterProducts(query) {
    const term = String(query || '').trim().toLowerCase();
    if (!term) {
        displayProducts(products);
        return;
    }
    const filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
    });
    displayProducts(filtered);
}

function setupSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    searchInput.addEventListener('input', (event) => {
        filterProducts(event.target.value);
    });
}

function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.includes(id)) {
        alert('This product is already in the cart.');
        return;
    }

    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart.');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

setupSearch();
getProducts();
