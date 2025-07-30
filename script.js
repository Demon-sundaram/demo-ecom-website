// Product Data
const products = {
    men: [
        {
            id: 'm1',
            title: 'Classic Denim Jacket',
            price: 2999,
            image: 'denim-jacket.jpg'
        },
        {
            id: 'm2',
            title: 'Slim Fit Chinos',
            price: 1499,
            image: 'photo-1473966968600-fa801b869a1a.avif'
        },
        {
            id: 'm3',
            title: 'Cotton Polo Shirt',
            price: 899,
            image: 'photo-1586363104862-3a5e2ab60d99.avif'
        },
        {
            id: 'm4',
            title: 'Casual Sneakers',
            price: 2499,
            image: 'photo-1491553895911-0055eca6402d.avif'
        }
    ],
    women: [
        {
            id: 'w1',
            title: 'Floral Summer Dress',
            price: 1999,
            image: 'photo-1572804013309-59a88b7e92f1.avif'
        },
        {
            id: 'w2',
            title: 'High-Waist Jeans',
            price: 1799,
            image: 'photo-1541099649105-f69ad21f3246.avif'
        },
        {
            id: 'w3',
            title: 'Leather Handbag',
            price: 3499,
            image: 'photo-1590874103328-eac38a683ce7.avif'
        },
        {
            id: 'w4',
            title: 'Classic Blazer',
            price: 2999,
            image: 'photo-1591047139829-d91aecb6caea.avif'
        }
    ]
};

// Cart State
let cart = [];

// DOM Elements
const mensProducts = document.getElementById('mens-products');
const womensProducts = document.getElementById('womens-products');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
            <button class="add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
    `;
    return card;
}

// Initialize Products
function initializeProducts() {
    products.men.forEach(product => {
        mensProducts.appendChild(createProductCard(product));
    });
    products.women.forEach(product => {
        womensProducts.appendChild(createProductCard(product));
    });
}

// Add to Cart
function addToCart(productId) {
    const product = [...products.men, ...products.women].find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

// Update Cart
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart('${item.id}')" style="margin-left: 1rem;">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString('en-IN');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Remove from Cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    }
}

// Toggle Cart Modal
document.querySelector('.cart').addEventListener('click', () => {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
});

// Close Cart Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase! This is a demo site.');
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    }
});

// Initialize the page
initializeProducts(); 
