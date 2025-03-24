
 Frontend (React.js) Developers: 
 
Developer 1: Core UI & Navigation 
 Home Page (/) 
 Search Results Page (/search?q=product_name) 
 Product Details Page (/product/:id) 
 Wish list Page (/wishlist) 
 
Developer 2: User & Admin Features 
 Price History Page (/product/:id/price-history) 
 Login & Register Page (/login & /register) 
 User Profile Page (/profile) 
 Admin Dashboard (/admin) 
 
Backend (Node.js + Express.js) Developers: 
 
Developer 3: User & Product Management 
 Database (MongoDB/PostgreSQL): 
o User authentication (storing user data, JWT tokens) 
o Wishlist & Price Alerts (saving products & notifications) 
o User profile data (name, preferences, settings) 
 User Authentication (Register, Login, JWT) 
 Profile management 
 Wishlist & Price Alerts 
 Admin Panel (manage users & products) 
 
Developer 4: Data Scraping & APIs 
 
 Database (MongoDB/PostgreSQL): 
o Store product details & price history 
o Maintain price comparison data from multiple stores 
o Scraping logs for monitoring system performance 
 Product Search & Price Comparison (scraping multiple stores) 
 Fetch real-time product data 
 Store & update price history 
 System analytics for admin panel 
 
 
Database  
 Schema Design: 
o Users (ID, email, password, wishlist, alerts) 
o Products (ID, name, details, images, category) 
o Prices (product ID, store, price, timestamp) 
o Wishlist (user ID, product ID, target price) 
o Alerts (user ID, product ID, price drop notifications) 
 CRUD Operations: 
o Insert/update product prices 
o Retrieve user wishlist & alerts 
o Manage admin operations