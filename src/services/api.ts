const API_BASE_URL = 'https://hafaksurgicals-backend.onrender.com/api';

// API response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  errors?: Record<string, string>; // For validation errors
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API error interface
export interface ApiError {
  message: string;
  status?: number;
}

// Base API class
class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Get auth token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  // getHeaders method removed as it's not used

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Start with basic headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // If Authorization header is provided in options, use it
    if (options.headers && 'Authorization' in options.headers) {
      Object.assign(headers, options.headers);
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // For auth endpoints, return the error response instead of throwing
        if (endpoint.startsWith('/auth/') && response.status === 401) {
          return {
            success: false,
            data: data as T,
            message: data.message || 'Authentication failed'
          };
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // GET request
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  // POST request
  async post<T>(endpoint: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }

  // POST request with FormData (for file uploads)
  async postFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // PUT request with FormData (for file uploads)
  async putFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

// Create API instance
export const api = new ApiService(API_BASE_URL);

// Auth service
export class AuthService {
  // Login
  static async login(credentials: { username: string; password: string }) {
    const response = await api.post<{ token: string; user: any }>('/auth/login', credentials);
    return response;
  }

  // Register
  static async register(userData: { username: string; email: string; password: string; role?: string }) {
    const response = await api.post<{ token: string; user: any }>('/auth/register', userData);
    return response;
  }

  // Get current user profile
  static async getProfile() {
    const token = localStorage.getItem('token');
    console.log('AuthService.getProfile: Token from localStorage:', !!token);
    console.log('AuthService.getProfile: Token value:', token);
    
    const response = await api.get<{ user: any }>('/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    console.log('AuthService.getProfile: Response:', response);
    return response;
  }

  // Update profile
  static async updateProfile(profileData: { username?: string; email?: string }) {
    const response = await api.put<{ user: any }>('/auth/me', profileData);
    return response;
  }

  // Change password
  static async changePassword(passwordData: { currentPassword: string; newPassword: string; userId: string }) {
    const response = await api.put<{ message: string }>('/auth/change-password', passwordData);
    return response;
  }
}

// Image upload service
export class ImageUploadService {
  // Upload image to cloudinary
  static async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${API_BASE_URL}/equipment/test-upload`;
    const config: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

// Equipment service (for both admin and public use)
export class EquipmentService {
  // Get all equipment (admin)
  static async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    availability?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params?.availability) queryParams.append('availability', params.availability);

    const endpoint = `/equipment${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const token = localStorage.getItem('token');
    const response = await api.get<any>(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Get public equipment (for website)
  static async getPublic(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);

    const endpoint = `/equipment/public${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await api.get<any[]>(endpoint);
    return response;
  }

  // Get single equipment (admin)
  static async getById(id: string) {
    const token = localStorage.getItem('token');
    const response = await api.get<{ equipment: any }>(`/equipment/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Get single public equipment (for website)
  static async getPublicById(id: string) {
    const response = await api.get<any>(`/equipment/public/${id}`);
    return response;
  }

  // Create equipment (admin) - now using JSON instead of FormData
  static async create(equipmentData: any) {
    const token = localStorage.getItem('token');
    const response = await api.post<{ equipment: any }>('/equipment', equipmentData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Update equipment (admin) - now using JSON instead of FormData
  static async update(id: string, equipmentData: any) {
    const token = localStorage.getItem('token');
    const response = await api.put<{ equipment: any }>(`/equipment/${id}`, equipmentData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Delete equipment (admin)
  static async delete(id: string) {
    const token = localStorage.getItem('token');
    const response = await api.delete<{ message: string }>(`/equipment/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Search public equipment (for website)
  static async search(query: string) {
    const response = await api.get<{ equipment: any[] }>(`/equipment/search?q=${encodeURIComponent(query)}`);
    return response;
  }

  // Get featured equipment (for homepage)
  static async getFeatured(limit?: number) {
    const endpoint = `/equipment/featured${limit ? `?limit=${limit}` : ''}`;
    const response = await api.get<any[]>(endpoint);
    return response;
  }

  // Get equipment categories (for website)
  static async getCategories() {
    const response = await api.get<any[]>('/equipment/categories');
    return response;
  }

  // Get equipment statistics (admin)
  static async getStats() {
    const token = localStorage.getItem('token');
    const response = await api.get<{ stats: any }>('/equipment/stats/overview', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }
}

// Category service (for admin operations)
export class CategoryService {
  // Get all categories
  static async getAll() {
    const token = localStorage.getItem('token');
    const response = await api.get<{ categories: any[] }>('/categories', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Get single category
  static async getById(id: string) {
    const token = localStorage.getItem('token');
    const response = await api.get<{ category: any }>(`/categories/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Create category
  static async create(categoryData: { name: string; description: string; icon: string; sortOrder?: number }) {
    const token = localStorage.getItem('token');
    const response = await api.post<{ category: any }>('/categories', categoryData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Update category
  static async update(id: string, categoryData: { name?: string; description?: string; icon?: string; sortOrder?: number }) {
    const token = localStorage.getItem('token');
    const response = await api.put<{ category: any }>(`/categories/${id}`, categoryData, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Delete category
  static async delete(id: string) {
    const token = localStorage.getItem('token');
    const response = await api.delete<{ message: string }>(`/categories/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Get category with equipment
  static async getWithEquipment(id: string, params?: { page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/categories/${id}/equipment${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const token = localStorage.getItem('token');
    const response = await api.get<{ category: any; equipment: any }>(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }

  // Get categories statistics
  static async getStats() {
    const token = localStorage.getItem('token');
    const response = await api.get<{ categories: any[] }>('/categories/stats/overview', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response;
  }
}

// Product service (deprecated - now using Equipment)
export class ProductService {
  // Redirect all calls to EquipmentService for backward compatibility
  static async getAll(params?: any) {
    return EquipmentService.getPublic(params);
  }

  static async getById(id: string) {
    return EquipmentService.getPublicById(id);
  }

  static async getByCategory(category: string, params?: any) {
    return EquipmentService.getPublic({ ...params, category });
  }

  static async search(query: string) {
    return EquipmentService.search(query);
  }

  static async getCategories() {
    return EquipmentService.getCategories();
  }

  static async getFeatured(limit?: number) {
    return EquipmentService.getFeatured(limit);
  }
}
