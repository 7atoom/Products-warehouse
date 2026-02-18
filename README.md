# 📦 Products Warehouse

> A modern, full-featured inventory management system built with Angular 21, MongoDB, and TailwindCSS

![Angular](https://img.shields.io/badge/Angular-21.1.0-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Backend-47A248?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)

## ✨ Features

- 🛍️ **Product Management** - Complete CRUD operations for products
- 📊 **Real-time Statistics** - Track inventory levels and product status
- 🔍 **Advanced Filtering** - Filter products by category, status, and search
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful interface powered by TailwindCSS
- 🔔 **Toast Notifications** - User-friendly feedback with SweetAlert2
- 🎯 **Product Details** - Comprehensive product information view
- 📝 **Form Validation** - Robust form handling with Angular Reactive Forms
- 🗂️ **Category Management** - Dynamic category system with MongoDB integration
- 📍 **Inventory Tracking** - Monitor stock levels, locations, and restock dates
- 🔄 **RESTful API Integration** - Connected to MongoDB backend with proper error handling
- ⚡ **Reactive State Management** - Signals-based state management with RxJS
- 🎭 **Component Architecture** - Reusable components with attribute directives

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v11.6.0 or higher)
- **Angular CLI** (v21.1.0)
- **MongoDB** (v5.0 or higher) - for the backend API

```bash
npm install -g @angular/cli@21.1.0
```

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd products-warehouse
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the MongoDB backend server**

Ensure your MongoDB backend API is running on `http://localhost:3000`. The API should provide the following endpoints:

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/categories` - Get all categories

4. **Start the development server**

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

## 🏗️ Project Structure

```
products-warehouse/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── form-actions/    # Form action buttons
│   │   │   ├── form-header/     # Form header component
│   │   │   ├── products-filter-bar/  # Filtering controls
│   │   │   ├── products-stats/  # Statistics dashboard
│   │   │   └── toast/           # Notification component
│   │   ├── pages/               # Application pages
│   │   │   ├── products-list/   # Products listing page
│   │   │   │   └── components/  # Page-specific components
│   │   │   │       └── product-card/  # Product row component (attribute directive)
│   │   │   ├── product-details/ # Product detail view
│   │   │   ├── product-form/    # Add/Edit product form
│   │   │   ├── header/          # Main header
│   │   │   ├── footer/          # Main footer
│   │   │   └── error/           # 404 error page
│   │   ├── core/                # Core functionality
│   │   │   └── services/        # Business logic & API calls
│   │   │       ├── products-service.ts
│   │   │       ├── categories-service.ts
│   │   │       ├── toast-service.ts
│   │   │       └── view-state-service.ts
│   │   ├── utils/               # Type definitions & interfaces
│   │   │   ├── Product.ts       # Product interface with MongoDB schema
│   │   │   ├── Category.ts      # Category interface
│   │   │   └── Toast.ts         # Toast notification types
│   │   ├── directives/          # Custom directives
│   │   └── pipes/               # Custom pipes
│   └── ...
├── server/
│   ├── db.json                  # JSON Server database
│   └── package.json             # Server dependencies
└── ...
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Angular 21.1.0 (Standalone Components)
- **Language:** TypeScript 5.9.2
- **Styling:** TailwindCSS 4.1.18
- **Icons:** Font Awesome 7.1.0
- **Notifications:** SweetAlert2 11.26.17
- **State Management:** Angular Signals + RxJS 7.8.0
- **HTTP Client:** Angular HttpClient with interceptors

### Backend
- **Database:** MongoDB (with Mongoose ODM)
- **API Architecture:** RESTful API
- **Response Format:** JSON with wrapped responses
  ```typescript
  {
    status: "success",
    results?: number,
    data: T | T[]
  }
  ```

### Development Tools
- **Build Tool:** Angular CLI & esbuild
- **Testing:** Vitest 4.0.8
- **Code Quality:** Prettier (configured)
- **Package Manager:** npm 11.6.0

## 📖 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server on `http://localhost:4200` |
| `npm run build` | Build the project for production |
| `npm run watch` | Build in watch mode with development configuration |
| `npm test` | Run unit tests with Vitest |
| `ng generate component <name>` | Generate a new component |
| `ng generate service <name>` | Generate a new service |

## 🎯 Key Features Explained

### Product Management
- **Add Products:** Create new products with comprehensive validation including:
  - Name, description, price, quantity, category (MongoDB reference)
  - Supplier, location, minimum stock levels
  - Product code validation (format: CODE-1234)
  - Automatic status calculation based on stock levels
- **Edit Products:** Update existing products with API error handling
- **Delete Products:** Remove products with confirmation dialogs
- **View Details:** See comprehensive product information with category details

### API Integration & Error Handling
- **MongoDB Integration:** Products and categories stored in MongoDB
- **Category References:** Products reference categories by MongoDB `_id`
- **Nested Objects:** Categories populated with `{_id, name}` structure
- **Error Messages:** Display specific validation errors from API
  - Example: "Quantity must be an integer greater than 0"
- **HTTP Methods:** 
  - `GET` for fetching data
  - `POST` for creating products
  - `PATCH` for updating products (partial updates)
  - `DELETE` for removing products

### State Management
- **Angular Signals:** Reactive state management for products and categories
- **Computed Values:** Automatic calculation of filtered products and statistics
- **RxJS Observables:** HTTP requests and async operations
- **Helper Methods:** Extract product IDs (`_id` or `id`) and category names

### Inventory Tracking
- **Stock Status:** Real-time status indicators (In Stock, Low Stock, Out of Stock)
- **Quantity Management:** Track current stock levels and minimum stock thresholds
- **Location Tracking:** Monitor where products are stored (Aisle format)
- **Restock Dates:** Keep track of when products were last restocked

### Filtering & Organization
- **Category Filters:** Dynamic category dropdown from MongoDB
- **Status Filters:** Filter by stock availability
- **Search:** Quick product search by name, code, or description
- **Statistics Dashboard:** Real-time overview of inventory health

### Component Architecture
- **Attribute Directives:** Product card as table row (`[app-product-card]`)
- **Input Properties:** Pass data and helper functions to components
- **Standalone Components:** Modern Angular component architecture
- **Reusable Components:** Modular design for maintainability

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for unit testing. Run tests with:

```bash
npm test
```

## 🏭 Building for Production

To create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for performance and speed.

## 🎨 Styling & Theming

This project uses **TailwindCSS 4.1** with custom configuration. The design system includes:
- Responsive breakpoints for all device sizes
- Custom color palette
- Utility-first CSS approach
- Font Awesome icons integration

## 📱 Responsive Design

The application is fully responsive and tested on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

This project uses Prettier for code formatting with the following configuration:
- Print width: 100 characters
- Single quotes for JavaScript/TypeScript
- Angular parser for HTML templates

Format your code before committing:
```bash
npx prettier --write .
```

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with [Angular CLI](https://angular.dev/tools/cli)
- Icons by [Font Awesome](https://fontawesome.com/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Notifications by [SweetAlert2](https://sweetalert2.github.io/)

## 📧 Contact & Support

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

<div align="center">
  Made with ❤️ using Angular
</div>
