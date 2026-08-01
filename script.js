// Мәзір деректері (Мұнда кафеге қажетті тағамдар мен суреттерді қоясыз)
const menuItems = [
    { id: 1, name: "Фирменный Рибай Стейк", category: "hot", price: 6800, desc: "Таңдаулы сиыр еті, ерекше авторлық соуспен", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500" },
    { id: 2, name: "Трюфельді Бургер", category: "fastfood", price: 3400, desc: "Қытырлақ котлет, мраморлы ірімшік және трюфель соусы", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 3, name: "Элитная Пепперони", category: "fastfood", price: 4200, desc: "Моцарелла, ірі таңдалған салями, қызанақ соусы", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 4, name: "Элегант Мохито", category: "drinks", price: 1600, desc: "Балғын жалбыз, лайм, премиум тоник және мұз", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" },
    { id: 5, name: "Балғын Манго Фреш", category: "drinks", price: 2100, desc: "100% табиғи экзотикалық манго шырыны", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500" },
    { id: 6, name: "Королевский Тирамису", category: "dessert", price: 2300, desc: "Италиялық рецепт бойынша жасалған нәзік десерт", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500" },
    { id: 7, name: "Премиум Лагман", category: "hot", price: 2700, desc: "Қолдан созылған нәзік кеспе және таңдаулы қой еті", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500" }
];

let cart = [];

window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
});

// Мәзірді экранға шығару
function displayMenuItems(items) {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('menu-card');
        card.innerHTML = `
            <div class="menu-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="menu-img">
            </div>
            <div class="menu-info">
                <h3 class="menu-title">${item.name}</h3>
                <p class="menu-desc">${item.desc}</p>
            </div>
            <div class="menu-footer">
                <span class="menu-price">${item.price.toLocaleString()} ₸</span>
                <button class="add-to-cart" onclick="addToCart(${item.id})">Қосу</button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Санаттар бойынша сүзу
function filterMenu(category) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        displayMenuItems(menuItems);
    } else {
        const filtered = menuItems.filter(item => item.category === category);
        displayMenuItems(filtered);
    }
}

// Себетті ашу/жабу
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    sidebar.classList.toggle('open');
}

// Тағамды себетке қосу
function addToCart(id) {
    const product = menuItems.find(item => item.id === id);
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Себетті жаңарту
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const totalAmount = document.getElementById('totalAmount');

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-text">Себетіңіз әзірге бос</p>';
        cartCount.textContent = '0';
        totalAmount.textContent = '0 ₸';
        return;
    }

    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.classList.add('cart-item');
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>${item.price.toLocaleString()} ₸ x ${item.quantity}</span>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartCount.textContent = totalCount;
    totalAmount.textContent = totalPrice.toLocaleString() + ' ₸';
}

// Санын өзгерту
function changeQuantity(id, amount) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += amount;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

// WhatsApp-қа тапсырыс жіберу
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Себет бос! Алдымен тағам таңдаңыз.");
        return;
    }

    let phoneNumber = "77011234567"; // Кафенің WhatsApp нөмірін осында жазасыз
    let message = "✨ *Maison Elite - Жаңа тапсырыс*\n\n";

    let totalPrice = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} – ${item.quantity} дана (${(item.price * item.quantity).toLocaleString()} ₸)\n`;
        totalPrice += item.price * item.quantity;
    });

    message += `\n💎 *Жалпы сомасы: ${totalPrice.toLocaleString()} ₸*`;

    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}