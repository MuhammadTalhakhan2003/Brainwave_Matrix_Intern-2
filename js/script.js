// Fetch products from FakeStoreAPI
fetch('https://hp-api.onrender.com/api/characters')
  .then(response => response.json())
  .then(data => {
    renderProducts(data); // Now 'data' is the array of products
  })
  .catch(error => console.error('Error fetching data:', error));

const cart = [];
const favorites = [];

// Render products dynamically
function renderProducts(products) {
  const productContainer = document.getElementById('product-list');
  productContainer.innerHTML = ''; // Clear previous products

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');
    productElement.dataset.id = product.id; // Storing product ID for later use
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.house}</h3>
      <p>$${product.actor}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="addToFavorites(${product.id})">Add to Favorites</button>
    `;
    productContainer.appendChild(productElement);
  });
}

// Add product to cart
function addToCart(productId) {
  const product = getProductById(productId);
  if (product) {
    cart.push(product);
    alert(`${product.name} added to cart!`);
    renderCart();
  }
}

// Add product to favorites
function addToFavorites(productId) {
  const product = getProductById(productId);
  if (product) {
    favorites.push(product);
    alert(`${product.name} added to favorites!`);
    renderFavorites();
  }
}

// Get product by ID from the DOM
function getProductById(productId) {
  const productElement = document.querySelector(`[data-id='${productId}']`);
  const productTitle = productElement.querySelector('h3').innerText;
  const productPrice = productElement.querySelector('p').innerText.replace('$', '');
  const productImage = productElement.querySelector('img').src;

  return {
    id: productId,
    title: productTitle,
    price: parseFloat(productPrice),
    image: productImage
  };
}

// Render cart items
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${item.title} - $${item.price}`;
    cartContainer.appendChild(cartItem);
  });
}

// Render favorite items
function renderFavorites() {
  const favoritesContainer = document.getElementById('favorites-list');
  favoritesContainer.innerHTML = '';
  favorites.forEach(item => {
    const favoriteItem = document.createElement('li');
    favoriteItem.textContent = item.title;
    favoritesContainer.appendChild(favoriteItem);
  });
}

// Search functionality
function searchProducts() {
  const query = document.getElementById('search').value.toLowerCase();
  fetch('https://hp-api.onrender.com/api/characters')
    .then(response => response.json())
    .then(data => {
      const filteredProducts = data.filter(product =>
        product.house.toLowerCase().includes(query)||
        product.name.toLowerCase().includes(query) || 
        product.actor.toLowerCase().includes(query) 
        
      );
      renderProducts(filteredProducts);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Checkout functionality (basic)
function checkout() {
  if (cart.length > 0) {
    alert(`Your total is $${cart.reduce((total, item) => total + item.price, 0)}. Proceeding with checkout...`);
    cart.length = 0; // Clear the cart after checkout
    renderCart();
  } else {
    alert('Your cart is empty!');
  }
}
// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    // Get the cart data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Render cart items in the order summary
    renderOrderSummary(cart);
  
    // Listen for form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handlePayment);
  });
  
  // Render the order summary
  function renderOrderSummary(cart) {
    const cartItemsContainer = document.getElementById('cart-items-summary');
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.textContent = `${item.title} - $${item.price}`;
      cartItemsContainer.appendChild(cartItem);
    });
  
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
  }
  
  // Handle payment
  function handlePayment(event) {
    event.preventDefault();
    
    // Get payment details
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
  
    if (!cardName || !cardNumber) {
      alert('Please fill in all payment details!');
      return;
    }
  
    // Simulate payment processing
    alert('Payment successful! Thank you for your purchase.');
  
    // Clear cart after successful payment
    localStorage.removeItem('cart');
  
    // Redirect to home page (or order confirmation page)
    window.location.href = 'index.html';
  }
  // Theme toggle functionality
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggleButton.addEventListener('click', toggleTheme);

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';

  if (currentTheme === 'light') {
    body.classList.remove('light');
    body.classList.add('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// Set default theme to light
document.body.classList.add('light');
themeIcon.classList.add('fa-sun');
