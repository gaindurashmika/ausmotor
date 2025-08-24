// Sample data for vehicles and blog posts
let vehicles = [
    {
        id: 1,
        name: "Tata Harier",
        location: "Dominican Republic, Santo Domingo",
        price: 1260000,
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mileage: "123,400 Km",
        fuel: "Diesel",
        transmission: "Automatic",
        condition: "used"
    },
    {
        id: 2,
        name: "Jeep Compass",
        location: "Dominican Republic, Santo Domingo",
        price: 890000,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mileage: "89,200 Km",
        fuel: "Gasoline",
        transmission: "Automatic",
        condition: "used"
    },
    {
        id: 3,
        name: "Tata Nexon",
        location: "Dominican Republic, Santo Domingo",
        price: 950000,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        mileage: "45,800 Km",
        fuel: "Electric",
        transmission: "Automatic",
        condition: "new"
    }
];

let blogPosts = [
    {
        id: 1,
        title: "Volkswagen Jetta A7 2019",
        content: "A comprehensive review of the 2019 Volkswagen Jetta A7, exploring its features, performance, and value for money.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        date: "2021-09-13"
    },
    {
        id: 2,
        title: "Ferrari F8",
        content: "Experience the thrill of the Ferrari F8, a masterpiece of engineering and design that represents the pinnacle of automotive excellence.",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        date: "2023-03-21"
    },
    {
        id: 3,
        title: "Honda CRV Automatic Japanese Import",
        content: "Discover the reliability and comfort of the Honda CRV, a popular choice among families looking for a versatile SUV.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        date: "2023-07-23"
    }
];

// Admin credentials (in real app, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "ausmotors2025"
};

// DOM elements
const adminModal = document.getElementById('adminModal');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminPanel = document.getElementById('adminPanel');
const closeModal = document.querySelector('.close');
const adminLoginForm = document.getElementById('adminLoginForm');
const logoutBtn = document.getElementById('logoutBtn');
const vehicleGrid = document.getElementById('vehicleGrid');
const blogGrid = document.getElementById('blogGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    renderVehicles();
    renderBlogPosts();
    setupEventListeners();
    loadDataFromStorage();
});

// Setup event listeners
function setupEventListeners() {
    // Admin login button
    adminLoginBtn.addEventListener('click', () => {
        adminModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // Admin login form
    adminLoginForm.addEventListener('submit', handleAdminLogin);

    // Logout button
    logoutBtn.addEventListener('click', handleLogout);

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterVehicles(btn.dataset.filter);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        searchVehicles(e.target.value);
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.querySelector('input').value = '';
            }
        });
    }
}

// Handle admin login
function handleAdminLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        adminModal.style.display = 'none';
        adminPanel.classList.remove('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        renderAdminPanel();
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Handle logout
function handleLogout() {
    adminPanel.classList.add('hidden');
    adminPanel.innerHTML = `
        <div class="admin-header">
            <h2>Admin Control Panel</h2>
            <button id="logoutBtn">Logout</button>
        </div>
        <div class="admin-content">
            <div class="admin-section">
                <h3>Manage Vehicles</h3>
                <div class="admin-form">
                    <input type="text" id="vehicleName" placeholder="Vehicle Name">
                    <input type="text" id="vehicleLocation" placeholder="Location">
                    <input type="number" id="vehiclePrice" placeholder="Price">
                    <input type="text" id="vehicleImage" placeholder="Image URL">
                    <input type="text" id="vehicleMileage" placeholder="Mileage">
                    <select id="vehicleFuel">
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                    <select id="vehicleTransmission">
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                    <button id="addVehicleBtn">Add Vehicle</button>
                </div>
                <div class="vehicle-list" id="adminVehicleList">
                    <!-- Admin vehicle list -->
                </div>
            </div>
            <div class="admin-section">
                <h3>Manage Blog Posts</h3>
                <div class="admin-form">
                    <input type="text" id="blogTitle" placeholder="Blog Title">
                    <textarea id="blogContent" placeholder="Blog Content"></textarea>
                    <input type="text" id="blogImage" placeholder="Image URL">
                    <input type="date" id="blogDate">
                    <button id="addBlogBtn">Add Blog Post</button>
                </div>
                <div class="blog-list" id="adminBlogList">
                    <!-- Admin blog list -->
                </div>
            </div>
        </div>
    `;
    
    // Re-attach event listeners
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('addVehicleBtn').addEventListener('click', addVehicle);
    document.getElementById('addBlogBtn').addEventListener('click', addBlogPost);
}

// Render vehicles
function renderVehicles() {
    vehicleGrid.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const vehicleCard = createVehicleCard(vehicle);
        vehicleGrid.appendChild(vehicleCard);
    });
}

// Create vehicle card
function createVehicleCard(vehicle) {
    const card = document.createElement('div');
    card.className = 'vehicle-card';
    
    card.innerHTML = `
        <img src="${vehicle.image}" alt="${vehicle.name}">
        <div class="vehicle-info">
            <h3 class="vehicle-name">${vehicle.name}</h3>
            <p class="vehicle-location">${vehicle.location}</p>
            <div class="vehicle-specs">
                <span><i class="fas fa-tachometer-alt"></i> ${vehicle.mileage}</span>
                <span><i class="fas fa-gas-pump"></i> ${vehicle.fuel}</span>
                <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
            </div>
            <div class="vehicle-price">$${vehicle.price.toLocaleString()}</div>
            <a href="#" class="view-details">View details</a>
        </div>
    `;
    
    return card;
}

// Render blog posts
function renderBlogPosts() {
    blogGrid.innerHTML = '';
    
    blogPosts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });
}

// Create blog card
function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="blog-content">
            <p class="blog-date">${formattedDate}</p>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-snippet">${post.content}</p>
        </div>
    `;
    
    return card;
}

// Filter vehicles
function filterVehicles(condition) {
    const filteredVehicles = condition === 'all' 
        ? vehicles 
        : vehicles.filter(vehicle => vehicle.condition === condition);
    
    vehicleGrid.innerHTML = '';
    filteredVehicles.forEach(vehicle => {
        const vehicleCard = createVehicleCard(vehicle);
        vehicleGrid.appendChild(vehicleCard);
    });
}

// Search vehicles
function searchVehicles(query) {
    if (!query) {
        renderVehicles();
        return;
    }
    
    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.name.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(query.toLowerCase())
    );
    
    vehicleGrid.innerHTML = '';
    filteredVehicles.forEach(vehicle => {
        const vehicleCard = createVehicleCard(vehicle);
        vehicleGrid.appendChild(vehicleCard);
    });
}

// Render admin panel
function renderAdminPanel() {
    renderAdminVehicleList();
    renderAdminBlogList();
    
    // Add event listeners for admin functions
    document.getElementById('addVehicleBtn').addEventListener('click', addVehicle);
    document.getElementById('addBlogBtn').addEventListener('click', addBlogPost);
}

// Render admin vehicle list
function renderAdminVehicleList() {
    const adminVehicleList = document.getElementById('adminVehicleList');
    adminVehicleList.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const vehicleItem = document.createElement('div');
        vehicleItem.className = 'vehicle-item';
        vehicleItem.innerHTML = `
            <h4>${vehicle.name}</h4>
            <p><strong>Location:</strong> ${vehicle.location}</p>
            <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
            <p><strong>Mileage:</strong> ${vehicle.mileage}</p>
            <p><strong>Fuel:</strong> ${vehicle.fuel}</p>
            <p><strong>Transmission:</strong> ${vehicle.transmission}</p>
            <button class="delete-btn" onclick="deleteVehicle(${vehicle.id})">Delete</button>
        `;
        adminVehicleList.appendChild(vehicleItem);
    });
}

// Render admin blog list
function renderAdminBlogList() {
    const adminBlogList = document.getElementById('adminBlogList');
    adminBlogList.innerHTML = '';
    
    blogPosts.forEach(post => {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-item';
        blogItem.innerHTML = `
            <h4>${post.title}</h4>
            <p><strong>Date:</strong> ${new Date(post.date).toLocaleDateString()}</p>
            <p><strong>Content:</strong> ${post.content.substring(0, 100)}...</p>
            <button class="delete-btn" onclick="deleteBlogPost(${post.id})">Delete</button>
        `;
        adminBlogList.appendChild(blogItem);
    });
}

// Add vehicle
function addVehicle() {
    const name = document.getElementById('vehicleName').value;
    const location = document.getElementById('vehicleLocation').value;
    const price = parseFloat(document.getElementById('vehiclePrice').value);
    const image = document.getElementById('vehicleImage').value;
    const mileage = document.getElementById('vehicleMileage').value;
    const fuel = document.getElementById('vehicleFuel').value;
    const transmission = document.getElementById('vehicleTransmission').value;
    
    if (!name || !location || !price || !image || !mileage) {
        alert('Please fill in all fields');
        return;
    }
    
    const newVehicle = {
        id: Date.now(),
        name,
        location,
        price,
        image,
        mileage,
        fuel,
        transmission,
        condition: 'used'
    };
    
    vehicles.push(newVehicle);
    saveDataToStorage();
    renderVehicles();
    renderAdminVehicleList();
    
    // Clear form
    document.getElementById('vehicleName').value = '';
    document.getElementById('vehicleLocation').value = '';
    document.getElementById('vehiclePrice').value = '';
    document.getElementById('vehicleImage').value = '';
    document.getElementById('vehicleMileage').value = '';
    
    alert('Vehicle added successfully!');
}

// Add blog post
function addBlogPost() {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const image = document.getElementById('blogImage').value;
    const date = document.getElementById('blogDate').value;
    
    if (!title || !content || !image || !date) {
        alert('Please fill in all fields');
        return;
    }
    
    const newBlogPost = {
        id: Date.now(),
        title,
        content,
        image,
        date
    };
    
    blogPosts.push(newBlogPost);
    saveDataToStorage();
    renderBlogPosts();
    renderAdminBlogList();
    
    // Clear form
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
    document.getElementById('blogImage').value = '';
    document.getElementById('blogDate').value = '';
    
    alert('Blog post added successfully!');
}

// Delete vehicle
function deleteVehicle(id) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        vehicles = vehicles.filter(vehicle => vehicle.id !== id);
        saveDataToStorage();
        renderVehicles();
        renderAdminVehicleList();
        alert('Vehicle deleted successfully!');
    }
}

// Delete blog post
function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        blogPosts = blogPosts.filter(post => post.id !== id);
        saveDataToStorage();
        renderBlogPosts();
        renderAdminBlogList();
        alert('Blog post deleted successfully!');
    }
}

// Save data to localStorage
function saveDataToStorage() {
    localStorage.setItem('ausMotorsVehicles', JSON.stringify(vehicles));
    localStorage.setItem('ausMotorsBlogPosts', JSON.stringify(blogPosts));
}

// Load data from localStorage
function loadDataFromStorage() {
    const savedVehicles = localStorage.getItem('ausMotorsVehicles');
    const savedBlogPosts = localStorage.getItem('ausMotorsBlogPosts');
    
    if (savedVehicles) {
        vehicles = JSON.parse(savedVehicles);
        renderVehicles();
    }
    
    if (savedBlogPosts) {
        blogPosts = JSON.parse(savedBlogPosts);
        renderBlogPosts();
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Vehicle navigation arrows
document.querySelector('.nav-btn.next').addEventListener('click', () => {
    // Implement next page functionality
    console.log('Next page');
});

document.querySelector('.nav-btn.prev').addEventListener('click', () => {
    // Implement previous page functionality
    console.log('Previous page');
});

// Search button functionality
document.querySelector('.search-btn').addEventListener('click', () => {
    const condition = document.getElementById('conditionFilter').value;
    const make = document.getElementById('makeFilter').value;
    const model = document.getElementById('modelFilter').value;
    const price = document.getElementById('priceFilter').value;
    
    // Implement search functionality based on filters
    console.log('Searching with filters:', { condition, make, model, price });
    alert('Search functionality would filter vehicles based on your criteria');
});

// Category buttons functionality
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.parentElement.querySelector('h3').textContent;
        alert(`Showing all ${category} vehicles`);
    });
});

// Read more buttons functionality
document.querySelectorAll('.read-more-btn, .read-all-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('This would navigate to a detailed page or expand content');
    });
});

// Newsletter subscription
document.querySelector('.newsletter button').addEventListener('click', () => {
    const email = document.querySelector('.newsletter input').value;
    if (email && email.includes('@')) {
        alert('Thank you for subscribing to our newsletter!');
        document.querySelector('.newsletter input').value = '';
    } else {
        alert('Please enter a valid email address');
    }
});

// Make functions globally available for onclick events
window.deleteVehicle = deleteVehicle;
window.deleteBlogPost = deleteBlogPost;