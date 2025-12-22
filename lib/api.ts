// Direct connection to BFF at localhost:8081 for aisles and localhost:8080 for products/orders (CORS is configured on the BFF)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const AISLES_API_BASE_URL = process.env.NEXT_PUBLIC_AISLES_API_URL || 'http://localhost:8081';

export interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  total: number;
  status?: string;
  createdAt?: string;
}

export interface Aisle {
  name: string;
  icon: string;
  count: number;
}

class ApiClient {
  private productsOrdersBaseUrl: string;
  private aislesBaseUrl: string;

  constructor(productsOrdersBaseUrl: string, aislesBaseUrl: string) {
    this.productsOrdersBaseUrl = productsOrdersBaseUrl;
    this.aislesBaseUrl = aislesBaseUrl;
  }

  private async request<T>(
    baseUrl: string,
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Aisles API - calling BFF directly
  async getAisles(): Promise<Aisle[]> {
    return this.request<Aisle[]>(this.aislesBaseUrl, '/api/aisles');
  }

  // Products API - calling BFF directly
  async getProducts(): Promise<ApiProduct[]> {
    return this.request<ApiProduct[]>(this.productsOrdersBaseUrl, '/api/products');
  }

  async getProduct(id: string): Promise<ApiProduct> {
    return this.request<ApiProduct>(this.productsOrdersBaseUrl, `/api/products/${id}`);
  }

  // Orders API - calling BFF directly
  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>(this.productsOrdersBaseUrl, '/api/orders');
  }

  async getOrder(id: string): Promise<Order> {
    return this.request<Order>(this.productsOrdersBaseUrl, `/api/orders/${id}`);
  }

  async createOrder(order: Omit<Order, 'id' | 'status' | 'createdAt'>): Promise<Order> {
    return this.request<Order>(this.productsOrdersBaseUrl, '/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    return this.request<Order>(this.productsOrdersBaseUrl, `/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  }

  async deleteOrder(id: string): Promise<void> {
    return this.request<void>(this.productsOrdersBaseUrl, `/api/orders/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL, AISLES_API_BASE_URL);



