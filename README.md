# 📦 Products Warehouse

> A modern, full-featured inventory management system built with Angular 21 and TailwindCSS

![Angular](https://img.shields.io/badge/Angular-21.1.0-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)

## ✨ Features

- 🛍️ **Product Management** - Complete CRUD operations for products
- 📊 **Real-time Statistics** - Track inventory levels and product status
- 🔍 **Advanced Filtering** - Filter products by category, status, and more
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful interface powered by TailwindCSS
- 🔔 **Toast Notifications** - User-friendly feedback with SweetAlert2
- 🎯 **Product Details** - Comprehensive product information view
- 📝 **Form Validation** - Robust form handling with Angular Forms
- 🗂️ **Category Management** - Organize products by categories
- 📍 **Inventory Tracking** - Monitor stock levels, locations, and restock dates

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v11.6.0 or higher)
- **Angular CLI** (v21.1.0)

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

3. **Start the backend server**

```bash
cd server
npm install
npm start
```

The JSON Server API will run on `http://localhost:10000`

4. **Start the development server** (in a new terminal)

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
│   │   │   ├── product-card/    # Product display card
│   │   │   ├── products-filter-bar/  # Filtering controls
│   │   │   ├── products-stats/  # Statistics dashboard
│   │   │   └── toast/           # Notification component
│   │   ├── pages/               # Application pages
│   │   │   ├── products-list/   # Products listing page
│   │   │   ├── product-details/ # Product detail view
│   │   │   ├── product-form/    # Add/Edit product form
│   │   │   ├── header/          # Main header
│   │   │   ├── footer/          # Main footer
│   │   │   └── error/           # 404 error page
│   │   ├── services/            # Business logic & API calls
│   │   │   ├── products-service.ts
│   │   │   ├── categories-service.ts
│   │   │   ├── toast-service.ts
│   │   │   └── view-state-service.ts
│   │   ├── utils/               # Type definitions
│   │   │   ├── Product.ts
│   │   │   ├── Category.ts
│   │   │   └── Toast.ts
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
- **Framework:** Angular 21.1.0
- **Language:** TypeScript 5.9.2
- **Styling:** TailwindCSS 4.1.18
- **Icons:** Font Awesome 7.1.0
- **Notifications:** SweetAlert2 11.26.17
- **State Management:** RxJS 7.8.0

### Backend
- **Mock API:** JSON Server 0.17.4
- **Data Persistence:** JSON file-based database

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

### Server Scripts

```bash
cd server
npm start    # Start JSON Server on http://localhost:10000
```

## 🎯 Key Features Explained

### Product Management
- **Add Products:** Create new products with detailed information including name, description, price, quantity, category, supplier, and location
- **Edit Products:** Update existing product information
- **Delete Products:** Remove products from inventory
- **View Details:** See comprehensive product information including stock status and restock history

### Inventory Tracking
- **Stock Status:** Real-time status indicators (In Stock, Low Stock, Out of Stock)
- **Quantity Management:** Track current stock levels and minimum stock thresholds
- **Location Tracking:** Monitor where products are stored
- **Restock Dates:** Keep track of when products were last restocked

### Filtering & Organization
- **Category Filters:** Group and filter products by categories
- **Status Filters:** Filter by stock availability
- **Search:** Quick product search functionality
- **Statistics Dashboard:** Overview of inventory health

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
