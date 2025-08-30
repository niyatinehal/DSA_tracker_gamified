const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('dsa-forest-token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('dsa-forest-token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('dsa-forest-token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Health check
  async checkHealth(): Promise<{ ok: boolean }> {
    return this.request('/health');
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<{ token: string; user: any }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout(): Promise<void> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<any> {
    return this.request('/auth/me');
  }

  // Problems endpoints
  async getDailyProblem(): Promise<any> {
    return this.request('/problems/daily');
  }

  async getProblems(page = 1, limit = 20): Promise<any> {
    return this.request(`/problems?page=${page}&limit=${limit}`);
  }

  async getProblem(id: number): Promise<any> {
    return this.request(`/problems/${id}`);
  }

  // Submissions endpoints
  async submitSolution(problemId: number, code: string, language = 'javascript'): Promise<any> {
    return this.request('/submissions', {
      method: 'POST',
      body: JSON.stringify({ problemId, code, language }),
    });
  }

  async getSubmissions(userId?: number): Promise<any> {
    const endpoint = userId ? `/submissions?userId=${userId}` : '/submissions';
    return this.request(endpoint);
  }

  // Achievements endpoints
  async getAchievements(userId?: number): Promise<any> {
    const endpoint = userId ? `/achievements?userId=${userId}` : '/achievements';
    return this.request(endpoint);
  }

  async unlockAchievement(achievementId: number): Promise<any> {
    return this.request('/achievements/unlock', {
      method: 'POST',
      body: JSON.stringify({ achievementId }),
    });
  }

  // Analytics endpoints
  async getAnalytics(userId?: number): Promise<any> {
    const endpoint = userId ? `/analytics?userId=${userId}` : '/analytics';
    return this.request(endpoint);
  }

  async getTopicStrengths(userId?: number): Promise<any> {
    const endpoint = userId ? `/analytics/topics?userId=${userId}` : '/analytics/topics';
    return this.request(endpoint);
  }

  // Forest summary endpoint
  async getForestSummary(userId: number): Promise<{
    treesPlanted: number;
    totalSolved: number;
    currentStreak: number;
    bestStreak: number;
  }> {
    return this.request(`/users/${userId}/forest`);
  }

  // User profile endpoints
  async updateProfile(data: any): Promise<any> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();