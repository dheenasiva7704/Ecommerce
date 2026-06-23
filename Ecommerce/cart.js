let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

async function loadCart() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const cartProducts = products.filter(product => cart.includes(product.id));
        displayCart(cartProducts);
    } catch (error) {
        console.error('Failed to load cart:', error);
        document.getElementById('cartContainer').innerHTML = '<div class="col-12 text-center text-danger">Unable to load cart items. Please refresh.</div>';
    }
}

loadCart();

function displayCart(data) {
    const container = document.getElementById('cartContainer');
    let total = 0;
    container.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="lead">Your cart is empty.</p><a class="btn btn-primary" href="index.html">Continue Shopping</a></div>';
        document.getElementById('totalPrice').innerText = '0.00';
        return;
    }

    data.forEach(product => {
        total += product.price;
        container.innerHTML += `
        <div class="col-sm-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                    <h6 class="product-title mb-2">${product.title}</h6>
                    <p class="text-muted mb-2">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-danger mt-auto" onclick="removeItem(${product.id})">Remove</button>
                </div>
            </div>
        </div>`;
    });

    document.getElementById('totalPrice').innerText = total.toFixed(2);
}

function removeItem(id) {
    cart = cart.filter(item => item !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}