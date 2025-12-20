# ShopHub - E-Commerce Store

A modern, responsive e-commerce web application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog**: Browse through products fetched from backend API
- 🔍 **Product Details**: View detailed information about each product
- 🛒 **Shopping Cart**: Add products to cart, adjust quantities, and view totals
- 📦 **Order Management**: Submit orders to backend and view order history
- 💾 **Persistent Cart**: Cart data is saved to localStorage
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface with smooth animations
- 🔌 **Backend Integration**: Connected to REST API at localhost:8080

## Getting Started

### Prerequisites

- Node.js 18+ and npm (for local development)
- Docker and Docker Compose (for containerized deployment)
- Make (optional, for using Makefile commands)
- Backend API running on `localhost:8082` (see Backend Configuration below)

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

2. Open [http://localhost:3001](http://localhost:3001) in your browser to see the app.

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

3. Open [http://localhost:3001](http://localhost:3001) in your browser to see the app.

## Backend Configuration

The frontend connects to a backend gRPC server running on `localhost:8082`. The gRPC server address can be configured using environment variables.

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
GRPC_SERVER=localhost:8082
# Or use BACKEND_URL (will be converted to gRPC format)
BACKEND_URL=http://localhost:8082
```

If not set, it defaults to `localhost:8082`.

### gRPC Services

The backend should provide the following gRPC services defined in the `proto/` directory:

**ProductService:**
- `GetProducts(GetProductsRequest) returns (GetProductsResponse)` - Get all products
- `GetProduct(GetProductRequest) returns (Product)` - Get a specific product

**OrderService:**
- `GetOrders(GetOrdersRequest) returns (GetOrdersResponse)` - Get all orders
- `GetOrder(GetOrderRequest) returns (Order)` - Get a specific order
- `CreateOrder(CreateOrderRequest) returns (Order)` - Create a new order
- `UpdateOrder(UpdateOrderRequest) returns (Order)` - Update an order
- `DeleteOrder(DeleteOrderRequest) returns (DeleteOrderResponse)` - Delete an order

### Protobuf Definitions

The protobuf service definitions are located in the `proto/` directory:
- `proto/products.proto` - Product service definitions
- `proto/orders.proto` - Order service definitions

These files define the gRPC service contracts between the frontend and backend.

### API Data Models

**Product:**
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}
```

**Order:**
```typescript
{
  id?: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status?: string;
  createdAt?: string;
}
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Home page with product grid
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts    # Products API route (gRPC proxy)
│   │   │   └── [id]/
│   │   │       └── route.ts # Single product API route
│   │   └── orders/
│   │       ├── route.ts    # Orders API route (gRPC proxy)
│   │       └── [id]/
│   │           └── route.ts # Single order API route
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx    # Product detail page
│   ├── orders/
│   │   └── page.tsx        # Orders listing page
│   └── globals.css         # Global styles
├── components/
│   ├── ProductCard.tsx     # Product card component
│   ├── ProductGrid.tsx    # Product grid layout
│   ├── CartIcon.tsx       # Cart icon with badge
│   └── CartModal.tsx      # Shopping cart modal
├── context/
│   └── CartContext.tsx    # Cart state management
├── lib/
│   ├── api.ts             # REST API client (legacy, now uses gRPC)
│   └── grpc-client.ts     # gRPC client for backend communication
├── proto/
│   ├── products.proto     # Product service protobuf definitions
│   └── orders.proto       # Order service protobuf definitions
├── data/
│   └── products.ts        # Product data (legacy, now from backend)
└── types/
    ├── product.ts         # TypeScript types
    └── order.ts           # Order TypeScript types
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
- **gRPC** - High-performance RPC framework for backend communication
- **Protocol Buffers** - Data serialization format for gRPC services

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

