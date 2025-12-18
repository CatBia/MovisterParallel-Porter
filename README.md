# ShopHub - E-Commerce Store

A modern, responsive e-commerce web application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse through a curated selection of products
- 🔍 **Product Details**: View detailed information about each product
- 🛒 **Shopping Cart**: Add products to cart, adjust quantities, and view totals
- 💾 **Persistent Cart**: Cart data is saved to localStorage
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ and npm (for local development)
- Docker and Docker Compose (for containerized deployment)
- Make (optional, for using Makefile commands)

### Running with Docker (Recommended)

The easiest way to run the application is using Docker and the provided Makefile:

1. Build and start the application:
```bash
make build
make up
```

Or use Docker Compose directly:
```bash
docker-compose up --build
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

3. View logs:
```bash
make logs
```

4. Stop the application:
```bash
make down
```

### Available Makefile Commands

- `make build` - Build the Docker image
- `make up` - Start the application in detached mode
- `make down` - Stop and remove containers
- `make restart` - Restart the application
- `make logs` - Show application logs
- `make shell` - Open a shell in the running container
- `make clean` - Remove containers, images, and volumes
- `make dev` - Run the app in development mode (without Docker)

### Local Development (Without Docker)

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page with product grid
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx    # Product detail page
│   └── globals.css         # Global styles
├── components/
│   ├── ProductCard.tsx     # Product card component
│   ├── ProductGrid.tsx    # Product grid layout
│   ├── CartIcon.tsx       # Cart icon with badge
│   └── CartModal.tsx      # Shopping cart modal
├── context/
│   └── CartContext.tsx    # Cart state management
├── data/
│   └── products.ts        # Product data
└── types/
    └── product.ts         # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Docker

The application includes Docker support for easy deployment:

- **Dockerfile** - Multi-stage build for optimized production image
- **docker-compose.yml** - Docker Compose configuration
- **Makefile** - Convenient commands for Docker operations

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management for cart

## Features in Detail

### Product Catalog
- Grid layout displaying all available products
- Product cards with images, names, descriptions, and prices
- Stock status indicators
- Click on any product to view details

### Product Details
- Large product image
- Full product description
- Quantity selector
- Add to cart functionality

### Shopping Cart
- View all items in cart
- Adjust item quantities
- Remove items
- See total price
- Persistent across page refreshes

## License

MIT

